import React from "react";
import { useFormContext } from "react-hook-form";

const BasicDetails = () => {
  // Get all the hooks we need
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Return the form
  return (
    <div className="flex flex-col gap-7">
      <h2 className="text-2xl text-gray-200 font-bold mb-2">List Your Property</h2>
      <h2 className="text-xl text-gray-200 font-bold mb-1">Basic Details</h2>
      <label className="text-gray-200 text-sm font-bold flex-1">
        Property Name
        <input
          className="border border-blue-300 text-gray-200 rounded w-full py-1 px-2 font-normal bg-[#202225]"
          {...register("name", { required: "Property name is required" })}
        ></input>
        {errors.name && (
          <span className="text-red-500 text-sm font-light">
            {errors.name.message}
          </span>
        )}
      </label>
      <div className="flex flex-col sm:flex-row gap-5">
        <label className="text-gray-200 text-sm font-bold flex-1">
          City
          <input
            className="border border-blue-300 text-gray-200 rounded w-full py-1 px-2 font-normal bg-[#202225]"
            {...register("city", { required: "City is required" })}
          ></input>
          {errors.city && (
            <span className="text-red-500 text-sm font-light">
              {errors.city.message}
            </span>
          )}
        </label>
        <label className="text-gray-200 text-sm font-bold flex-1">
          Country
          <input
            className="border border-blue-300 text-gray-200 rounded w-full py-1 px-2 font-normal bg-[#202225]"
            {...register("country", { required: "Country is required" })}
          ></input>
          {errors.country && (
            <span className="text-red-500 text-sm font-light">
              {errors.country.message}
            </span>
          )}
        </label>
      </div>
      <label className="text-gray-200 text-sm font-bold flex-1">
        Property Description
        <textarea
          rows={5}
          className="border border-blue-300 text-gray-200 rounded w-full py-1 px-2 font-normal bg-[#202225]"
          {...register("description", {
            required: "Property description is required",
          })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500 text-sm font-light">
            {errors.description.message}
          </span>
        )}
      </label>
      <label className="text-gray-200 text-sm font-bold flex-1">
        Property Price <i className="font-normal">(per night)</i>
        <input
          type="number"
          className="border border-blue-300 text-gray-200 rounded w-full py-1 px-2 font-normal bg-[#202225]"
          min={1}
          {...register("price", { required: "Property price is required" })}
        ></input>
        {errors.price && (
          <span className="text-red-500 text-sm font-light">
            {errors.price.message}
          </span>
        )}
      </label>
      <div className="flex flex-row gap-5">
        <label className="text-gray-200 text-sm font-bold flex-1">
          Property Rating
          <select
            {...register("propertyRating", {
              required: "Property rating is required",
            })}
            className="border border-blue-300 text-gray-200 rounded w-full p-1  font-normal bg-[#202225]"
          >
            <option value="" className="text-sm font-bold">
              Select propery rating
            </option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option value={num}>{num}</option>
            ))}
          </select>
          {errors.propertyRating && (
            <span className="text-red-500 text-sm font-light">
              {errors.propertyRating.message}
            </span>
          )}
        </label>
        {/* <label className="text-gray-700 text-sm font-bold flex-1 text-center">
          <input
            type="checkbox"
            {...register("freeCancellation")}
            className="accent-black"
          />
          <span>Free Cancellation</span>
          {errors.freeCancellation && (
          <span className="text-red-500 text-sm font-light">
            {errors.freeCancellation.message}
          </span>
        )}
        </label> */}
      </div>
      <div className="flex flex-col sm:flex-row gap-5">
        <label className="text-gray-200 text-sm font-bold flex-1">
          Adult Count <i className="font-normal">(minimum 1)</i>
          <select
            {...register("adultCount", {
              required: "Adult required",
            })}
            className="border border-blue-300 text-gray-200 rounded w-full p-1  font-normal bg-[#202225]"
          >
            <option value="" className="text-sm  text-gray-200font-bold">
              Select adult count
            </option>
            {[1, 2, 3].map((num) => (
              <option value={num}>{num}</option>
            ))}
          </select>
          {errors.adultCount && (
            <span className="text-red-500 text-sm font-light">
              {errors.adultCount.message}
            </span>
          )}
        </label>
        <label className="text-gray-200 text-sm font-bold flex-1">
          Child Count
          <select
            {...register("childCount", {
              required: "Child count is required",
            })}
            className="border border-blue-300 text-gray-200 rounded w-full p-1  font-normal bg-[#202225]"
          >
            <option value="" className="text-sm font-bold">
              Select child count
            </option>
            {[0, 1, 2, 3].map((num) => (
              <option value={num}>{num}</option>
            ))}
          </select>
          {errors.childCount && (
            <span className="text-red-500 text-sm font-light">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default BasicDetails;
