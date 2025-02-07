import React from "react";
import * as fetchAPI from "../../fetchAPI";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useSearchContext } from "../../contexts/SearchContext";
import getDurationBetweenDates from "../../scripts/getDurationBetweenDates";
import BookingDetails from "../../components/bookings/BookingDetails";
import BookingForm from "../../forms/BookingForm/BookingForm";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../../contexts/AppContext";

const Booking = () => {
  const { stripePromise } = useAppContext();
  const STRIPE_PUBLISHABLE_KEY =
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "";

  // Get the listingId from the URL
  const { listingId } = useParams();

  // Get the search context values
  const search = useSearchContext();

  // Calculate length of stay
  const lengthOfStay = getDurationBetweenDates(search.checkIn, search.checkOut);

  // Get user details
  const userDetails = useQuery("getUserDetails", () =>
    fetchAPI.getUserDetails()
  );

  const paymentIntentData = useQuery(
    "createPaymentIntent",
    () =>
      fetchAPI.createPaymentIntent({
        listingId,
        numNights: lengthOfStay.toString(),
      }),
    {
      enabled: !!listingId && !!lengthOfStay && lengthOfStay > 0,
    }
  );

  // get listing details by id
  const listingDetails = useQuery(
    "getListingDetailsById",
    () => fetchAPI.getListingDetailsById(listingId),
    {
      enabled: !!listingId,
    }
  );

  if (listingDetails.isLoading || userDetails.isLoading) {
    return <div className="text-slate-200">Loading...</div>;
  }

  if (paymentIntentData.isLoading) return <div className="text-slate-200">Loading...</div>;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-3 w-4/5 lg:mx-auto">
      <BookingDetails search={search} listingDetails={listingDetails.data} />
      {userDetails && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: paymentIntentData.clientSecret }}
        >
          <BookingForm
            userDetails={userDetails}
            paymentIntentData={paymentIntentData}
          />
        </Elements>
      )}
    </div>    
  );
};

export default Booking;
