import React from "react";
import { useFormContext } from "react-hook-form";

const ImagesSection = () => {
  // Get all the hooks we need
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  // Watch the imageURLs field
  const images = watch("images");
  // Handle delete image
  const handleDelete = (e, img) => {
    e.preventDefault();
    const newImages = images.filter((image) => image !== img);
    setValue("images", newImages);
  };

  // Return the form
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-1">Add Property Images</h2>
      <div className="border rounded-lg p-4 flex-col gap-4">
        {images && (
          <div>
            <div className="grid grid-cols-6 gap-4">
              {images.map((imageURL) => (
                <div className="relative group">
                  <img src={imageURL} className="min-h-full object-cover" />
                  <button
                    onClick={(event) => handleDelete(event, imageURL)}
                    className="absolute inset-0 flex justify-center items-center bg-black text-white bg-opacity-50 opacity-0 group-hover:opacity-100"
                  >
                    delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const len = imageFiles.length + (images?.length || 0);
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
