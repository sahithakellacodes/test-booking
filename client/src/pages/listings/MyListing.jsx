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

  const addListingButton = "border-2 border-blue-400 h-fit p-2 px-4 rounded-sm text-blue-400 font-semibold duration-300 hover:bg-blue-400 hover:text-white";
  const black_btn =
    "text-black border p-2 flex flex-row place-items-center gap-2 font-normal border-black rounded-full px-4 hover:bg-black hover:text-white";
  const red_btn =
    "text-red-600 border p-2 flex flex-row place-items-center gap-2 font-normal border-red-600 rounded-full px-4 hover:bg-red-600 hover:text-white";

  // Return the listings
  return (
    <div className="space-y-5">
      <div id="header">
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl text-slate-200 font-bold mb-2">My Listings</h2>
          <Link to="/listings/create" className={addListingButton}>
            Add listing
          </Link>
        </div>
      </div>
      <div id="Listings" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listings.map((listing) => (
          // <div className="border border-gray-300 rounded-lg p-4 flex flex-col gap-5 justify-between font-thin">
          //   <h2 className="font-semibold">{listing.name}</h2>
          //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 justify-between">
          //     <span className="border border-gray-300 p-3 rounded flex flex-row gap-2 place-items-center">
          //       <i className="fa-solid fa-map-pin"></i>
          //       <p>
          //         {listing.city}, {listing.country}
          //       </p>
          //     </span>
          //     <span className="border border-gray-300 p-3 rounded flex flex-row gap-2 place-items-center">
          //       <i className="fa-regular fa-credit-card"></i>
          //       {listing.price} INR
          //     </span>
          //     <span className="border border-gray-300 p-3 rounded flex flex-row gap-2 place-items-center">
          //       <i className="fa-regular fa-building"></i>
          //       {listing.type}
          //     </span>
          //     <span className="border border-gray-300 p-3 rounded flex flex-row gap-2 place-items-center">
          //       {listing.propertyRating} Rated
          //     </span>
          //   </div>
          //   <span className="flex justify-end gap-3">
          //     <Link
          //       to={`/listings/edit/${listing._id}`}
          //       // className="bg-black text-white p-2 rounded font-bold text-sm gap-2 flex flex-row place-items-center"
          //       className={black_btn}
          //     >
          //       <i className="fa-regular fa-pen-to-square"></i>
          //       <p>Edit</p>
          //     </Link>
          //     <button
          //       onClick={() => fetchAPI.deleteListingById(listing._id)}
          //       // className="bg-red-700 text-white p-2 rounded font-bold text-sm gap-2 flex flex-row place-items-center"
          //       className={red_btn}
          //     >
          //       <i className="fa-solid fa-trash"></i>
          //       <p>Delete</p>
          //     </button>
          //   </span>
          // </div>
          <MyListingCard listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default MyListing;
