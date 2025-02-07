import React from "react";
import { hotelTypes } from "../../config/hotelOptions";
import { useFormContext } from "react-hook-form";

const TypeSection = () => {
  // Get all the hooks we need
  const {
    register,
    watch,
    formState: {errors},
  } = useFormContext();
  const typeWatch = watch("type");

  // Return the form
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-1">Property Type</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {hotelTypes.map((type) => (
          <label
            key={type.label}
            className={
              typeWatch === type.label
                ? "cursor-pointer flex flex-col items-center border rounded-lg p-4 text-gray-200 bg-slate-700"
                : "cursor-pointer flex flex-col items-center border rounded-lg p-4"
            }
          >
            <input
              type="radio"
              value={type.label}
              {...register("type", {
                required: "Property type is required",
              })}
              className="hidden"
            />
            <i className={`p-2 ${type.icon}`}></i>
            <span>{type.label}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-light">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
