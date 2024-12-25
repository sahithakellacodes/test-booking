import React from "react";
import { useForm } from "react-hook-form";
import { CardElement } from "@stripe/react-stripe-js";

const BookingForm = ({ userDetails, paymentIntentData }) => {
  const { handleSubmit, register } = useForm();

  return (
    <form className="flex flex-col rounded-lg p-4 h-fit bg-[#13181C]">
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
          value={userDetails.data.username}
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
          value={userDetails.data.email}
          {...register("email", { required: true })}
        />
      </label>
      <span className="font-semibold text-slate-200 text-lg">
        Your Price Summary
      </span>
      <div className="flex flex-col mb-4 p-4 bg-blue-100 rounded-lg">
        <span className="font-semibold">
          {/* Total Cost: INR {paymentIntentData.totalCost.toFixed(2) || 0} */}
          Total Cost: €327.42
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
          className="border rounded-md p-2 text-sm text-white"
        />
      </div>
    </form>
  );
};

export default BookingForm;
