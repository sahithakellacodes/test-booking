import React from "react";

const UsernameInput = ({ register, errors }) => (
  <label className=" text-sm font-bold flex-1">
    Username
    <input
      className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring-1 focus:ring-gray-500"
      {...register("username", { required: "Username is required" })}
    ></input>
    {errors.username && (
      <span className="text-red-500 text-sm font-light">
        {errors.username.message}
      </span>
    )}
  </label>
);

export default UsernameInput;