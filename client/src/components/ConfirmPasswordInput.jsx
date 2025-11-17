import React from "react";

const ConfirmPasswordInput = ({ register, watch, errors }) => (
  <label className=" text-sm font-bold flex-1">
    Confirm Password
    <input
      type="password"
      className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring-1 focus:ring-gray-500"
      {...register("confirmPassword", {
        validate: (val) => {
          if (!val) {
            return "Please confirm password";
          } else if (watch("password") !== val) {
            return "Your passwords do no match";
          }
        },
      })}
    ></input>
    {errors.confirmPassword && (
      <span className="text-red-500 text-sm font-light">
        {errors.confirmPassword.message}
      </span>
    )}
  </label>
);

export default ConfirmPasswordInput;
