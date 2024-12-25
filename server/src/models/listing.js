import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define booking Schema
const bookingSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  listingId: {
    type: String,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  adultCount: {
    type: Number,
    required: true,
  },
  childCount: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

// Define listing Schema
const listingSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  adultCount: {
    type: Number,
    required: true,
  },
  childCount: {
    type: Number,
    required: true,
  },
  facilities: [
    {
      type: String,
      required: true,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  propertyRating: {
    type: Number,
    required: true,
  },
  // freeCancellation: {
  //   type: Boolean,
  //   required: true,
  // },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  bookings: [bookingSchema], // Embed the booking schema in the listing schema
});

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;