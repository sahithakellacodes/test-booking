import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import myListingsRoutes from "./routes/my-listings.js";
import listingsRoutes from "./routes/listings.js";
import bookingRoutes from "./routes/bookings.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url"; // new in Node.js 13.2.0
import { v2 as cloudinary } from "cloudinary";
import helmet from "helmet";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Server configuration (port, DB connection)
const port = process.env.PORT || 8080;

// Connect to DB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to DB");
    app.listen(port, () => {
      console.log(`server is listening to port ${port}`);
    });
  })
  .catch((err) => {
    console.log("error connecting to DB");
  });

// Express configuration, cors configuration, and cookie-parser
const app = express();
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      scriptSrc: ["'self'", "https://js.stripe.com", "https://maps.googleapis.com"],
      frameSrc: ["'self'", "https://js.stripe.com", "https://hooks.stripe.com"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com", "https://maps.googleapis.com", "https://maps.gstatic.com"],
      connectSrc: [
        "'self'",
        "https://maps.googleapis.com",
      ],
    },
  })
);
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(helmet.hidePoweredBy());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../../client/dist")));

/* ------------------------ CRUD ------------------------------ */

// Application Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/myListings", myListingsRoutes);
app.use("/api/listings", listingsRoutes);
app.use("/api/bookings", bookingRoutes);

// Catch all routes and serve index.html 
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});
