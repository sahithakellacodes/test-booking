import React from "react";
import { Link } from "react-router-dom";

const SearchResultCard = ({ listing }) => {
  const searchCardStyle = "grid grid-cols-1 border rounded-lg shadow-xl shadow-gray-50";
  return (
    <div className={searchCardStyle}>
      <div className="w-full h-[225px] p-3 pb-0">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="rounded-md w-full h-full object-cover"
        />
      </div>
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
          <p>
            <i className="mr-2 font-light text-sm">{listing.type}</i>
            {Array.from({ length: listing.propertyRating }).map((_, index) => (
              <i key={index} className="fa-solid fa-star text-yellow-400"></i>
            ))}
          </p>
        </div>
        <div className="font-light">
          {listing.city}, {listing.country}
        </div>
        <br />
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
        <div
          id="details-btn"
          className="flex flex-col gap-2 justify-end items-end mt-2"
        >
          <span className="text-md text-end font-light">
            INR <b className="font-semibold">{listing.price}</b> per night
          </span>
          <Link
            to={`/listing/details/${listing._id}`}
            className="border border-gray-200 p-2 px-4 text-sm rounded-md duration-100 ease-linear hover:bg-gray-100 hover:border-gray-100"
          >
            See availability{" "}
            <i className="fa-solid fa-chevron-right text-xs ml-1"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
