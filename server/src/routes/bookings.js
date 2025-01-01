import express from "express";
import User from "../models/user.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router({ mergeParams: true });
router.use(express.json());

// Get all my bookings
router.get("/", verifyToken, async (req, res) => {
    try {
        const userdata = await User.findById(req.userId);
        const bookings = userdata.bookings;
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
})

export default router;