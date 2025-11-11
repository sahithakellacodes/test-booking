import React from "react";
import * as fetchAPI from "../../fetchAPI";
import { useQuery } from "react-query";

const BookingCard = ({ bookingData }) => {
  const { data: listingData, isLoading } = useQuery(
    "getListingDetailsById",
    () => fetchAPI.getListingDetailsById(bookingData.listingId),
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
      },
      onError: (error) => {
        console.log("Error fetching data");
      },
    }
  );

  if (isLoading) {
    return <div className="text-slate-200">Loading...</div>;
  }

  return (
    <div>
      <div>
        <h3>{listingData.name}</h3>
        <p>{listingData.city}</p>
        <p>{listingData.country}</p>
      </div>
      <div>
        <p>Booking ID: {bookingData._id}</p>
        <p>Check-in: {bookingData.checkIn}</p>
        <p>Check-out: {bookingData.checkOut}</p>
        <p>Adults: {bookingData.adultCount}</p>
        <p>Children: {bookingData.childCount}</p>
      </div>
    </div>
  );
};

export default BookingCard;
