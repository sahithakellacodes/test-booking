import React from "react";
import { Link } from "react-router-dom";

const SearchResultCard = ({ listing }) => {
  // console.log(listing);
  // const searchCardStyle = "grid grid-cols-1 border border-slate-300 rounded-lg p-2 gap-4";
  const searchCardStyle = "grid grid-cols-1 rounded-xl bg-[#2F3137] shadow-lg";
  return (
    <div className={searchCardStyle}>
      <div className="w-full h-[225px]">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="rounded-t-xl w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col w-full p-2">
        <div
          id="quick-info"
          className="flex flex-row justify-between items-center"
        >
          <Link
            to={`/listing/details/${listing._id}`}
            className="font-bold text-slate-200"
          >
            {listing.name}
          </Link>
          <p>
            <i className="mr-2 text-slate-200">{listing.type}</i>
            {Array.from({ length: listing.propertyRating }).map((_, index) => (
              <i key={index} className="fa-solid fa-star text-yellow-400"></i>
            ))}
          </p>
        </div>
        <div className="text-slate-200">
          {listing.city}, {listing.country}
        </div>
        <br />
        <div className="flex-1 flex-col justify-between">
          <div id="facilities" className="">
            {/* {listing.facilities.map((item, index) => (
              <span key={index}> • {item}</span>
            ))} */}
            {listing.facilities.slice(0, 3).map((item, index) => (
              <span
                key={index}
                className="mr-1 mb-1 bg-slate-200 rounded-md text-xs p-1 px-2 inline-block"
              >
                {item}
              </span>
            ))}
            {listing.facilities.length > 3 && (
              <span className="mr-1 mb-1 bg-slate-200 rounded-md text-xs p-1 px-2 inline-block">
                +{listing.facilities.length - 3} more
              </span>
            )}
            {/* <HStack mt="4" wrap="wrap">
              {listing.facilities.slice(0, 3).map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))}
              {listing.facilities.length > 3 && (
                <Badge>+{listing.facilities.length - 3} more</Badge>
              )}
            </HStack> */}
          </div>
          {/* <div className="text-end">INR {listing.price} per night</div> */}
        </div>
        <div
          id="details-btn"
          className="flex flex-col gap-2 justify-end items-end"
        >
          <span className="text-md text-end text-slate-200">
            INR <b className="font-semibold">{listing.price}</b>
          </span>
          <Link
            to={`/listing/details/${listing._id}`}
            // className="border border-black p-1 px-3 rounded-md items-center w-fit hover:bg-black hover:text-white"
            className="p-2 px-4 h-fit rounded-md bg-[#5870dd] hover:bg-[#3E56C4] text-slate-200 flex flex-row place-items-center gap-2 text-sm"
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
