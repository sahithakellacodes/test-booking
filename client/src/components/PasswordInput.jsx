import React from "react";

const PasswordInput = ({ register, errors }) => (
  <label className=" text-sm font-bold flex-1">
    Password
    <input
      type="password"
      className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring-1 focus:ring-gray-500"
      {...register("password", {
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters",
        },
      })}
    ></input>
    {errors.password && (
      <span className="text-red-500 text-sm font-light">
        {errors.password.message}
      </span>
    )}
  </label>
);

export default PasswordInput;