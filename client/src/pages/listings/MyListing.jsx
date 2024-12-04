import React from "react";
import { Link } from "react-router-dom";
import * as fetchAPI from "../../fetchAPI";
import { useQuery } from "react-query";

const MyListing = () => {
  // Fetch all listings
  const { data: listings } = useQuery("listings", fetchAPI.getListings, {
    onSuccess: (data) => {
      console.log("Data: ", data);
    },
    onError: (error) => {
      console.log("Error fetching data");
    },
  });

  // If data is not fetched yet, display loading message
  if (!listings) {
    return <div>Loading...</div>;
  }

  // Return the listings
  return (
    <div className="space-y-5">
      <div id="header">
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-bold mb-2">My Listings</h2>
          <Link
            to="/listings/create"
            className="bg-black text-white p-2 rounded font-bold text-sm"
          >
            Add listing
          </Link>
        </div>
      </div>
      <div id="Listings" className="grid grid-cols-1 gap-6">
        {listings.map((listing) => (
          <div className="border border-gray-300 rounded-lg p-4 flex flex-col gap-5 justify-between font-thin">
            <h2 className="font-semibold">{listing.name}</h2>
            <div className="grid grid-cols-4 gap-3 justify-between">
              <span className="border border-gray-300 p-3 rounded flex flex-row gap-2 place-items-center">
                <i class="fa-solid fa-map-pin"></i>
                <p>
                  {listing.city}, {listing.country}
                </p>
              </span>
              <span className="border border-gray-300 p-3 rounded flex flex-row gap-2 place-items-center">
              <i class="fa-regular fa-credit-card"></i>
                {listing.price} INR
              </span>
              <span className="border border-gray-300 p-3 rounded flex flex-row gap-2 place-items-center">
              <i class="fa-regular fa-building"></i>
                {listing.type}
              </span>
              <span className="border border-gray-300 p-3 rounded flex flex-row gap-2 place-items-center">
                {listing.propertyRating} Rated
              </span>
            </div>
            <span className="flex justify-end gap-3">
              <Link
                to={`/listings/edit/${listing._id}`}
                className="bg-black text-white p-2 rounded font-bold text-sm gap-2 flex flex-row place-items-center"
              >
                <i class="fa-regular fa-pen-to-square"></i>
                <p>Edit</p>
              </Link>
              <Link
                to={`/listings/edit/${listing._id}`}
                className="bg-red-700 text-white p-2 rounded font-bold text-sm gap-2 flex flex-row place-items-center"
              >
                <i class="fa-solid fa-trash"></i>
                <p>Delete</p>
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListing;
