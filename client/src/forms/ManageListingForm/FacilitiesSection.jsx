import React from "react";
import { hotelFacilities } from "../../config/hotelOptions";
import { useFormContext } from "react-hook-form";

const FacilitiesSection = () => {
  // Get all the hooks we need
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const facilitiesWatch = watch("facilities") || [];

  // Return the form
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl  font-bold mb-1">Facilities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {hotelFacilities.map((facility) => (
          <label
            key={facility.label}
            className={
              facilitiesWatch?.includes(facility.label)
                ? "cursor-pointer flex flex-col items-center border rounded-lg p-4 text-gray-200 bg-slate-700"
                : "cursor-pointer flex flex-col items-center border rounded-lg p-4"
            }
          >
            <input
              type="checkbox"
              value={facility.label}
              {...register("facilities", {
                validate: (facilities) => {
                  return facilities && facilities?.length > 0
                    ? true
                    : "At least one facility is required";
                },
              })}
              className="hidden"
              // className="accent-black"
            />
            <i className={`p-2 ${facility.icon}`}></i>
            <span>{facility.label}</span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-light">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
