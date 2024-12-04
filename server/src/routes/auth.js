import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import "dotenv/config";
import createToken from "../scripts/createToken.js";
import verifyToken from "../middleware/auth.js";

// Create express router
const router = express.Router({ mergeParams: true });
router.use(express.json());

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password should be minimum 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    // check for any errors in the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // compare encrypted passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      /*
        we don't give out specific error messages like "email not found" or "password incorrect"
        because it can be used by attackers to guess the email addresses in the db
      */

      // Access token
      // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      //   expiresIn: "1d",
      // });

      // Create a token and send it to the user in a cookie
      const token = createToken(user);

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      res.status(200).json({ userId: user._id });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/validate-token", verifyToken, (req, res) => {
  res.status(200).send({ userId: req.userId });
});

router.post("/logout", (req, res) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.status(200).send({ message: "Logged out successfully" });
});

export default router;
