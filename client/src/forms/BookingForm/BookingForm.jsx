import React from "react";
import { useForm } from "react-hook-form";
import { CardElement } from "@stripe/react-stripe-js";
import { useStripe } from "@stripe/react-stripe-js";
import { useElements } from "@stripe/react-stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as fetchAPI from "../../fetchAPI";
import { useAppContext } from "../../contexts/AppContext";

const BookingForm = ({ userDetails, paymentIntentData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const search = useSearchContext();
  const { listingId } = useParams();
  const { showToast } = useAppContext();

  const { mutate: bookRoom, isLoading } = useMutation(
    (formData) => {
      const { bookingData } = formData;
      fetchAPI.createBooking(listingId, bookingData);
    },
    {
      onSuccess: () => {
        console.log("Booking created successfully");
        showToast({
          message: "Booking created successfully!",
          type: "success",
        });
      },
      onError: (error) => {
        console.error("Error creating booking: ", error);
        showToast({
          message: "Error saving booking!",
          type: "error",
        });
      },
    }
  );

  console.log("userdetails", userDetails.data);

  const { handleSubmit, register } = useForm({
    defaultValues: {
      username: userDetails.data.username,
      email: userDetails.data.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(), // Convert to ISO string as it's the format widely used by frameworks and packages
      checkOut: search.checkOut.toISOString(),
      listingId: listingId,
      totalPrice: paymentIntentData.data.totalPrice,
      paymentIntentId: paymentIntentData.data.paymentIntentId,
    },
  });

  console.log("Payment intent data: ", paymentIntentData.data);

  const onSubmit = async (formData) => {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(
      paymentIntentData.data.clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    if (result.paymentIntent?.status === "succeeded") {
      console.log("Payment succeeded");
      console.log("Form data: ", formData);
      // book the room
      bookRoom({
        ...formData,
        paymentIntentId: paymentIntentData.data.paymentIntentId,
      });
    }
  };

  return (
    <form
      className="flex flex-col rounded-lg p-4 h-fit bg-[#13181C]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl text-slate-200 font-bold mb-4">
        Booking Confirmation
      </h2>
      <hr />
      <label className="text-sm font-bold my-3 text-slate-200">
        Username
        <input
          className="mt-1 text-gray-700 border rounded w-full py-2 px-3 bg-gray-200 font-normal"
          type="text"
          readOnly
          disabled
          {...register("username", { required: true })}
        />
      </label>
      <label className="text-slate-200 text-sm font-bold my-3">
        Email
        <input
          className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
          type="email"
          readOnly
          disabled
          {...register("email", { required: true })}
        />
      </label>
      <span className="font-semibold text-slate-200 text-lg">
        Your Price Summary
      </span>
      <div className="flex flex-col mb-4 p-4 bg-blue-100 rounded-lg">
        <span className="font-semibold">
          Total Cost: INR {paymentIntentData.data.totalPrice.toFixed(2) || 0}
          {/* Total Cost: €327.42 */}
        </span>
        <span className="font-light text-sm">inclusive of taxes</span>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-slate-200">
          {" "}
          Payment Details
        </h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm bg-slate-200"
        />
        <div className="text-slate-200 p-2 flex justify-end">
          <button
            type="submit"
            className="p-2 px-4 h-fit rounded-md bg-[#5870dd] hover:bg-[#3E56C4] text-white flex flex-row place-items-center gap-2 text-sm disabled:opacity-50"
            disabled={isLoading}
          >
            <i className="fa-regular fa-credit-card"></i>
            {isLoading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default BookingForm;