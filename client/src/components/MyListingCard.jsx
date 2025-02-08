import React from "react";
import { Link } from "react-router-dom";
import * as fetchAPI from "../fetchAPI";

const MyListingCard = ({ listing }) => {
  // Styles
  const black_btn =
    "flex flex-row place-items-center gap-2 border duration-100 ease-linear hover:bg-[#f6f6f6] rounded-md px-4 py-2 text-sm";
  const red_btn =
    "flex flex-row place-items-center gap-2 border text-red-500 duration-100 ease-linear hover:text-white hover:bg-red-500 rounded-md px-4 py-2 text-sm";
  const searchCardStyle =
    "grid grid-cols-1 border rounded-lg shadow-xl shadow-gray-50";

  // Local components
  const Image = () => (
    <div className="w-full h-[225px] p-3 pb-0">
      <img
        src={listing.images[0]}
        alt={listing.title}
        className="rounded-md w-full h-full object-cover"
      />
    </div>
  );
  const StarRating = () => (
    <p>
      <i className="mr-2 font-light text-sm">{listing.type}</i>
      {Array.from({ length: listing.propertyRating }).map((_, index) => (
        <i key={index} className="fa-solid fa-star text-yellow-400"></i>
      ))}
    </p>
  );
  const Facilities = () => (
    <div className="flex-1 flex-col justify-between">
      <div id="facilities" className="">
        {listing.facilities.slice(0, 3).map((item, index) => (
          <span
            key={index}
            className="mr-1 mb-1 bg-[#F6F6F6] rounded-md text-xs p-1 px-2 inline-block"
          >
            {item}
          </span>
        ))}
        {listing.facilities.length > 3 && (
          <span className="mr-1 mb-1 bg-[#F6F6F6] rounded-md text-xs p-1 px-2 inline-block">
            +{listing.facilities.length - 3} more
          </span>
        )}
      </div>
    </div>
  );
  const ButtonOptions = () => (
    <span className="flex justify-end gap-3">
      <Link to={`/listings/edit/${listing._id}`} className={black_btn}>
        <i className="fa-regular fa-pen-to-square"></i>
        <p>Edit</p>
      </Link>
      <button
        onClick={() => fetchAPI.deleteListingById(listing._id)}
        className={red_btn}
      >
        <i className="fa-solid fa-trash"></i>
        <p>Delete</p>
      </button>
    </span>
  );

  return (
    <div className={searchCardStyle}>
      <Image />
      <div className="flex flex-col w-full p-3">
        <div
          id="quick-info"
          className="flex flex-row justify-between items-center"
        >
          <Link
            to={`/listing/details/${listing._id}`}
            className="font-semibold"
          >
            {listing.name}
          </Link>
          <StarRating />
        </div>
        <div className="font-light">
          {listing.city}, {listing.country}
        </div>
        <br />
        <Facilities />
        <div
          id="details-btn"
          className="flex flex-col gap-2 justify-end items-end mt-2"
        >
          <span className="text-md text-end font-light">
            INR {listing.price} per night
          </span>
          <ButtonOptions />
        </div>
      </div>
    </div>
  );
};

export default MyListingCard;
