import React from "react";
import { useFormContext } from "react-hook-form";

const ImagesSection = () => {
  // Get all the hooks we need
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Return the form
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-1">Add Property Images</h2>
      <div className="border border-gray-300 rounded-lg p-4 flex-col gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const len = imageFiles.length;
              if (len === 0) {
                return "At least one image is required";
              } else if (len > 6) {
                return "Maximum 6 images are allowed";
              }
              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-light">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
