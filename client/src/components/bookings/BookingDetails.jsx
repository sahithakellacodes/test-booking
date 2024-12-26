import React from "react";
import getDurationBetweenDates from "../../scripts/getDurationBetweenDates";

const BookingDetails = ({search, listingDetails}) => {
    const lengthOfStay = getDurationBetweenDates(search.checkIn, search.checkOut);

  return (
    <div id="booking-details" className="border-2 rounded-lg p-4 flex flex-col text-slate-200">
      <h2 className="text-lg font-semibold mb-4">Your Booking Details</h2>
      <hr />
      <span className="font-thin mt-4">Location:</span>
      <span className="mb-4">
        {listingDetails.name}, {listingDetails.city},{" "}
        {listingDetails.country}
      </span>
      <hr />
      <div className="grid grid-cols-2">
        <div className="flex flex-col">
          <span className="font-thin mt-4">Check-In</span>
          <span className="mb-4">
            {search.checkIn.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-thin mt-4">Check-Out</span>
          <span className="mb-4">
            {search.checkOut.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
      <hr />
      <span className="font-thin mt-4">Length of stay</span>
      <span className="mb-4">{lengthOfStay} nights</span>
      <hr />
      <span className="font-thin mt-4">Guests</span>
      <span>
        {search.adultCount} adults & {search.childCount} children
      </span>
    </div>
  );
};

export default BookingDetails;
