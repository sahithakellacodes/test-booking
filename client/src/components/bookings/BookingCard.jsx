import React from "react";
import * as fetchAPI from "../../fetchAPI";
import { useQuery } from "react-query";
import { formatDate } from "../../scripts/formatDate";

const BookingCard = ({ bookingData }) => {
  const { data: listingData, isLoading } = useQuery(
    ["getListingDetailsById", bookingData.listingId],
    () => fetchAPI.getListingDetailsById(bookingData.listingId),
    {
      onSuccess: (data) => {
        console.log("Data: ", data);
      },
      onError: (error) => {
        console.log("Error fetching data");
      },
    },
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
        <p>
          <b>Booking ID:</b> {bookingData._id}
        </p>
        <p>
          <b>Check-in:</b>{" "}
          {formatDate(bookingData.checkIn)}
        </p>
        <p>
          <b>Check-out:</b> {formatDate(bookingData.checkOut)}
        </p>
        <p>
          <b>Adults:</b> {bookingData.adultCount}
        </p>
        <p>
          <b>Children:</b> {bookingData.childCount}
        </p>
      </div>
    </div>
  );
};

export default BookingCard;
