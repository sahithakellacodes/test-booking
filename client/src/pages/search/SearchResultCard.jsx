import React from "react";
import {Link} from "react-router-dom";

const SearchResultCard = ({ listing }) => {
  // console.log(listing);
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-2 gap-2">
      <div className="w-full  h-[225px]"> 
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="rounded-md w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col w-full"> 
        <div className="flex flex-row justify-between items-center">
          <Link to={`/details/${listing._id}`} className="font-bold">{listing.name}</Link>
          <p>
            {Array.from({ length: listing.propertyRating }).map((_, index) => (
              <i key={index} className="fa-solid fa-star text-yellow-400"></i>
            ))}
          </p>
        </div>
        <br />
        <div className="flex-1">
          <div id="facilities">
            {listing.facilities.map((item, index) => (
              <span key={index}> • {item}</span>
            ))}
            {/* {listing.facilities.slice(0, 3).map((item, index) => (
              <span key={index}> • {item}</span>
            ))} */}
          </div>
        </div>
        <div className="flex justify-end">
          <span>{listing.city}</span>
          <Link to={`/details/${listing._id}`} className="border border-black p-1 px-3 rounded-md hover:bg-black hover:text-white">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
