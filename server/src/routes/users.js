import express from "express";
import User from "../models/user.js";
import { check, validationResult } from "express-validator";
import "dotenv/config";
import createToken from "../scripts/createToken.js";

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
        return res
          .status(500)
          .json({ message: "Something went wrong" }); // JWT secret key is not defined
      }
      // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      //   expiresIn: "1d",
      // });

      // Create a token and send it to the user in a cookie
      const token = createToken(user);

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
      });

      return res.status(200).send({ message: "user registered successfully" });

    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);



export default router;
