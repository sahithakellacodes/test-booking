import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import "dotenv/config";
import Listing from "../models/listing.js";
import verifyToken from "../middleware/auth.js";
import { check, body, validationResult } from "express-validator";
import { json } from "stream/consumers";

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
      const listingInfo = { ...req.body };
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
      const imageURLs = await uploadImageFiles(imageFiles);

      // Save the listing info to the database
      listingInfo.images = imageURLs;
      listingInfo.lastUpdated = new Date();
      listingInfo.userId = req.userId;
      console.log("info after additions: ", listingInfo);

      const listing = new Listing(listingInfo);
      await listing.save();
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

// Get one listing
router.get(
  "/:id",
  verifyToken,
  upload.array("imageFiles", 6),
  async (req, res) => {
    try {
      const listing = await Listing.findOne({
        _id: req.params.id,
        userId: req.userId,
      });
      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }

      res.status(200).json(listing);
    } catch (err) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

// Update a listing
router.put(
  "/:id",
  verifyToken,
  upload.array("imageFiles"),
  async (req, res) => {
    try {
      // Get updated listings from the request body and update DB
      const updatedListing = req.body;
      console.log("Updated Listing: ", updatedListing);
      updatedListing.lastUpdated = new Date();
      const listing = await Listing.findOneAndUpdate(
        { _id: req.params.id, userId: req.userId },
        updatedListing,
        { new: true }
      );

      if (!listing) {
        return res.status(404).json({ message: "Listing not found" });
      }

      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      // Get any additional files that the user uploaded
      const imageFiles = req.files;
      if (imageFiles && imageFiles.length > 0) {
        const imageURLs = await uploadImageFiles(imageFiles);
        console.log("imageURLs: ", imageURLs);

        // Add to the existing images object in DB (... is a spread operator)
        // [] is handling the case where the user deletes all existing images
        if (imageURLs.length > 0) {
          // Combine new and existing images
          listing.images = [...imageURLs, ...listing.images];
        }
      }

      console.log("Updated Listing with new images: ", listing.images);
      await listing.save();
      res
        .status(201)
        .json({ message: "Listing updated successfully!", data: listing });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
);

// Delete a listing
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const listing = await Listing.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json({ message: "Listing deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
});

async function uploadImageFiles(imageFiles) {
  const uploadPromises = imageFiles.map(async (imageFile) => {
    const b64Image = imageFile.buffer.toString("base64");
    let imageURI = "data:" + imageFile.mimetype + ";base64," + b64Image;
    const result = await cloudinary.v2.uploader.upload(imageURI);
    return result.url;
  });

  const imageURLs = await Promise.all(uploadPromises);
  return imageURLs;
}

export default router;
