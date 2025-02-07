import React from "react";
import { Link } from "react-router-dom";
import * as fetchAPI from "../../fetchAPI";
import { useQuery } from "react-query";
import MyListingCard from "../../components/MyListingCard";

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

  const addListingButton =
    "border-2 border-blue-400 h-fit p-2 px-4 rounded-sm text-blue-400 font-semibold duration-300 hover:bg-blue-400 hover:text-white";

  // Return the listings
  return (
    <div className="space-y-5">
      <div id="header">
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-bold mb-2">
            My Listings
          </h2>
          <Link to="/listings/create" className={addListingButton}>
            Add listing
          </Link>
        </div>
      </div>
      <div
        id="Listings"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {listings.map((listing) => (
          <MyListingCard listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default MyListing;
