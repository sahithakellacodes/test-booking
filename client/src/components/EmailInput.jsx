import React from "react";

const EmailInput = ({ register, errors }) => (
  <label className="text-sm font-bold flex-1">
    Email
    <input
      type="email"
      autoComplete="email"
      className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring-1 focus:ring-gray-500"
      {...register("email", { required: "Email is required" })}
    ></input>
    {errors.email && (
      <span className="text-red-500 text-sm font-light">
        {errors.email.message}
      </span>
    )}
  </label>
);

export default EmailInput;
