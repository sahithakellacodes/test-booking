import express from "express";
import Listing from "../models/listing.js";
// import constructSearchQuery from "../scripts/constructSearchQuery.js";
import { pagination_page_size } from "../config.js";

const router = express.Router({ mergeParams: true });
router.use(express.json());

router.get("/search", async (req, res) => {
  try {
    // filtering the listings based on the query parameters
    const query = constructSearchQuery(req.query);
    console.log(query);

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
