import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import "dotenv/config";
import Listing from "../models/listing.js";
import verifyToken from "../middleware/auth.js";
import { check, body, validationResult } from "express-validator";

const router = express.Router({ mergeParams: true });
router.use(express.json());

const storage = multer.memoryStorage();
/* 
  multer is a middleware that helps us handle file uploads
  it is used to parse form data that contains files and handle multipart/form-data
  store files in memory since we are directly uploading to cloudinary.
  we use memory storage because we are not storing the files in the
  server and memory is faster
*/

// we can add 'upload' as a middleware to any route to handle file uploads
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // max file size is 5MB
});

// Create a new listing
router.post(
  "/",
  verifyToken, // only logged in users can create listings
  upload.array("imageFiles", 6),
  [
    check("name", "Name is required").notEmpty().isString(),
    check("city", "City is required").notEmpty().isString(),
    check("country", "Country is required").notEmpty().isString(),
    check("description", "Description is required").notEmpty().isString(),
    check("type", "Property type is required").notEmpty().isString(),
    check("adultCount", "Adult count is required").notEmpty().isNumeric(),
    check("childCount", "Child count is required").notEmpty().isNumeric(),
    check("facilities", "Facilities are required").notEmpty().isArray(),
    check("price", "Price is required").notEmpty().isNumeric(),
    // check("freeCancellation", "Free cancellation is required").isBoolean(),
    check("propertyRating", "Property rating is required").isNumeric(),
    // check("images", "Images are required").notEmpty().isArray(),
  ],
  async (req, res) => {
    try {
      console.log("Creating listing");
      console.log("Request body: ", req.body);
      // check if there are any validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Validation errors: ", errors.array());
        return res.status(400).json({ message: errors.array() });
      }

      // Get the image files and listing info from the request
      const imageFiles = req.files;
      const listingInfo = {...req.body};
      console.log("info: ", listingInfo);
      console.log("cloudinary: ", cloudinary.config());
      
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      
      // Debug: Check Cloudinary config
      console.log("Cloudinary Config:", cloudinary.config());

      // Upload the images to cloudinary and get the image URLs
      const uploadPromises = imageFiles.map(async (imageFile) => {
        const b64Image = imageFile.buffer.toString("base64");
        let imageURI = "data:" + imageFile.mimetype + ";base64," + b64Image;
        const result = await cloudinary.v2.uploader.upload(imageURI);
        return result.url;
      });

      const imageURLs = await Promise.all(uploadPromises);

      // Save the listing info to the database
      listingInfo.images = imageURLs;
      listingInfo.lastUpdated = new Date();
      listingInfo.userId = req.userId;
      console.log("info after additions: ", listingInfo);

      const listing = new Listing(listingInfo);
      await listing.save();
      console.log("Listing save await successfully!");
      res.status(201).json({ message: "Listing created successfully!" });
    } catch (error) {
      console.log("error creating listing: ", error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
);

// Get all listings
router.get("/", verifyToken, async (req, res) => {
  try {
    const listings = await Listing.find({ userId: req.userId });
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
});

export default router;
