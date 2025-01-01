import React from "react";
import * as fetchAPI from "../../fetchAPI";
import { useQuery } from "react-query";
import BookingCard from "../../components/BookingCard";

const MyBookings = () => {
  const { data: bookings, isLoading } = useQuery(
    "bookings",
    fetchAPI.getBookings,
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
    <div className="text-slate-200">
      <div id="header">
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl text-slate-200 font-bold mb-5">
            My Bookings
          </h2>
        </div>
      </div>
      <div
        id="bookings"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {bookings.length === 0 ? (
          <p>No bookings found</p>
        ) : (
          bookings.map((booking) => (
            <BookingCard key={booking._id} bookingData={booking} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyBookings;
