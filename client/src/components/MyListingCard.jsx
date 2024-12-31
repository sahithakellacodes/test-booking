import React from "react";
import { Link } from "react-router-dom";
import * as fetchAPI from "../fetchAPI";

const MyListingCard = ({ listing }) => {
  // console.log(listing);
  // const searchCardStyle = "grid grid-cols-1 border border-slate-300 rounded-lg p-2 gap-4";
  const black_btn =
    "p-2 px-4 h-fit rounded-md bg-[#5870dd] hover:bg-[#3E56C4] text-slate-200 flex flex-row place-items-center gap-2 text-sm";
  const red_btn =
    "p-2 px-4 h-fit rounded-md bg-[#F24667] text-white hover:bg-[#df2f52] flex flex-row place-items-center gap-2 text-sm";

  const searchCardStyle = "grid grid-cols-1 rounded-xl bg-[#2F3137] p-2 gap-4 shadow-lg";
  return (
    <div className={searchCardStyle}>
      <div className="w-full h-[225px]">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="rounded-md w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col w-full">
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
          </div>
          {/* <div className="text-end">INR {listing.price} per night</div> */}
        </div>
        <div
          id="details-btn"
          className="flex flex-col gap-2 justify-end items-end"
        >
          <span className="text-lg text-slate-200 text-end">
            INR {listing.price} per night
          </span>
          <span className="flex justify-end gap-3">
            <Link
              to={`/listings/edit/${listing._id}`}
              // className="bg-black text-white p-2 rounded font-bold text-sm gap-2 flex flex-row place-items-center"
              className={black_btn}
            >
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
        </div>
      </div>
    </div>
  );
};

export default MyListingCard;
