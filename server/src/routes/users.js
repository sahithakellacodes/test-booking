import express from "express";
import User from "../models/user.js";
import { check, validationResult } from "express-validator";
import "dotenv/config";
import createToken from "../scripts/createToken.js";
import verifyToken from "../middleware/auth.js";

// Create a new router
const router = express.Router({ mergeParams: true });
router.use(express.json());

// Register a new user
router.post(
  "/register",
  [
    check("username", "Username is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password should be minimum 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    // Check for errors
    /*
      we do this to check if the user already exists in the database
      because creating tokens because these operations are computationally expensive
    */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.status(400).json("User already exists");
      }

      user = new User(req.body);
      await user.save();

      if (!process.env.JWT_SECRET_KEY) {
        return res.status(500).json({ message: "Something went wrong" }); // JWT secret key is not defined
      }

      // Create a token and send it to the user in a cookie
      // we do not want to create a token before saving the user to the database because we need the 
      // user id to create the token and the user id is generated after saving the user to the database
      const token = createToken(user);

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24,
      });

      return res.status(200).send({ message: "user registered successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

// Get the currently logged in user
router.get("/my-details", verifyToken, async (req, res) => {
  const userId = req.userId;

  try {
    // Exclude the password field from the response
    // This is safe since we are doing this on the server side
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (e) {
    console.log("Error in getting user details: ", e);
    res.status(500).send({ message: "Something went wrong" });
  }
});

export default router;
