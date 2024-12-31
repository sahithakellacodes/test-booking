import express from "express";
import Listing from "../models/listing.js";
import User from "../models/user.js";
// import constructSearchQuery from "../scripts/constructSearchQuery.js";
import { pagination_page_size } from "../config.js";
import { param, validationResult } from "express-validator";
import Stripe from "stripe";
import verifyToken from "../middleware/auth.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router({ mergeParams: true });
router.use(express.json());

// Get recent listings
router.get("/recently-added", async (req, res) => {
  try {
    const listings = await Listing.find().sort("-lastUpdated").limit(4);
    res.status(200).json(listings);
  } catch (err) {
    console.log("Get recent listings error: ", err);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

// Search listings
router.get("/search", async (req, res) => {
  try {
    // filtering the listings based on the query parameters
    const query = constructSearchQuery(req.query);

    // sorting options
    let sortOptions = {};
    if (req.query.sortOption === "price-asc") {
      sortOptions = { price: 1 };
    } else if (req.query.sortOption === "price-desc") {
      sortOptions = { price: -1 };
    } else if (req.query.sortOption === "rating-desc") {
      sortOptions = { propertyRating: -1 };
    } else if (req.query.sortOption === "rating-asc") {
      sortOptions = { propertyRating: 1 };
    }

    // pagination logic / meta data
    const page_size = pagination_page_size;
    const page_num = parseInt(req.query.page ? req.query.page.toString() : "1");
    const skip = (page_num - 1) * page_size;

    // Use pagination to limit the number of listings returned
    const listings = await Listing.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(page_size);

    const total = await Listing.countDocuments(query);
    const total_pages = Math.ceil(total / page_size);

    const response = {
      data: listings,
      meta: {
        total,
        pages: total_pages,
        page: page_num,
        page_size: page_size,
      },
    };

    res.status(200).json(response);
  } catch (err) {
    console.log("Search listings error: ", err);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

// Get listing by ID
router.get(
  "/:listingId",
  [param("listingId").notEmpty().withMessage("Listing ID is required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const id = req.params.listingId.toString();
      const listing = await Listing.findById(id);
      res.status(200).json(listing);
    } catch (err) {
      console.log("Get listing by ID error: ", err);
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
);

// Create payment intent
router.post("/:listingId/bookings/create-payment-intent", verifyToken, async (req, res) => {
  try {
    const {
      numNights
    } = req.body;
    const listingId = req.params.listingId;

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({
        message: "Listing not found"
      });
    }

    const pricePerNight = listing.price;
    const totalPrice = pricePerNight * 100 * numNights;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice,
      currency: "inr",
      metadata: {
        integration_check: "accept_a_payment",
        listingId: listingId,
        userId: req.userId,
        numNights: numNights,
      },
    });

    if (!paymentIntent.client_secret) {
      res.status(500).json({
        message: "Something went wrong!"
      });
    }

    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      totalPrice: totalPrice,
    };

    res.status(200).json(response);
  } catch (e) {
    console.log("Error creating payment intent: ", e);
    res.status(500).json({
      message: "Something went wrong!"
    });
  }
});

// Create property booking
router.post("/:listingId/bookings", verifyToken, async (req, res) => {
  console.log("REQUEST: ", req.body, "!!!REQUEST ENDS HERE!!!!!");
  try {
    // Check if payment intent exists
    const paymentIntentId = req.body.paymentIntentId;
    if (!paymentIntentId) {
      return res.status(400).json({
        message: "Payment intent ID is required"
      });
    }

    // Check if payment intent is valid
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (!paymentIntent) {
      return res.status(400).json({
        message: "Invalid payment intent"
      });
    }

    // Verify if the listing and user matches the payment intent
    if (paymentIntent.metadata.listingId !== req.params.listingId || paymentIntent.metadata.userId !== req.userId) {
      return res.status(400).json({
        message: "Invalid payment intent"
      });
    }

    // Check if payment intent is successful
    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        message: "Payment intent not successful"
      });
    }

    // Create the booking
    const newBooking = {
      userId: String(req.body.userId),
      username: String(req.body.username),
      email: String(req.body.email),
      listingId: String(req.params.listingId),
      checkIn: new Date(req.body.checkIn),
      checkOut: new Date(req.body.checkOut),
      adultCount: Number(req.body.adultCount),
      childCount: Number(req.body.childCount),
      totalPrice: Number(req.body.totalPrice),
    }

    // Update the listing with the new booking and save it
    const listing = await Listing.findOneAndUpdate({ _id: req.params.listingId }, { $push: { bookings: newBooking } });
    const user = await User.findOneAndUpdate({ _id: req.body.userId }, { $push: { bookings: newBooking } });

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found"
      });
    }

    if (!user) {
      console.log("User not found");
      return res.status(404).json({
        message: "Something went wrong!"
      });
    }

    await listing.save();

    res.status(200).json({
      message: "Booking created successfully!",
      data: newBooking
    });
  } catch (e) {
    console.log("Error creating booking: ", e);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

// Construct search query based on query parameters
const constructSearchQuery = (queryParams) => {
  let constructedQuery = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const propertyRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.propertyRating = { $in: propertyRatings };
  }

  if (queryParams.maxPrice) {
    constructedQuery.price = {
      $lte: parseInt(queryParams.maxPrice),
    };
  }

  return constructedQuery;
};

export default router;
