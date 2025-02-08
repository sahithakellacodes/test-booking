import React from "react";
import getDurationBetweenDates from "../../scripts/getDurationBetweenDates";

const BookingDetails = ({ search, listingDetails }) => {
  const lengthOfStay = getDurationBetweenDates(search.checkIn, search.checkOut);

  // Local components
  const DateInfo = ({ label, date }) => (
    <div className="flex flex-col">
      <span className="font-thin mt-4">{label}</span>
      <span className="mb-4">
        {date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </span>
    </div>
  );
  const BookingLocation = ({ listingDetails }) => (
    <span className="mb-4">
      {listingDetails.name}, {listingDetails.city}, {listingDetails.country}
    </span>
  );
  const Label = ({ text }) => <span className="font-thin mt-4">{text}</span>;

  return (
    <div
      id="booking-details"
      className="border rounded-lg p-4 flex flex-col shadow-xl shadow-gray-100"
    >
      <h2 className="text-lg font-semibold mb-4">Your Booking Details</h2>
      <hr />
      <Label text="Location:" />
      <BookingLocation listingDetails={listingDetails} />
      <hr />
      <div className="grid grid-cols-2">
        <DateInfo label="Check-In" date={search.checkIn} />
        <DateInfo label="Check-Out" date={search.checkOut} />
      </div>
      <hr />
      <Label text="Length of stay" />
      <span className="mb-4">{lengthOfStay} nights</span>
      <hr />
      <Label text="Guests" />
      <span>
        {search.adultCount} adults & {search.childCount} children
      </span>
    </div>
  );
};

export default BookingDetails;
