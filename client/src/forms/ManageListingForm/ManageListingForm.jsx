import React from "react";
import { Form } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import BasicDetails from "./BasicDetails";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import ImagesSection from "./ImagesSection";

const ManageListingForm = ({ onSave, isLoading }) => {
  // Get all the hooks we need
  const formMethods = useForm();
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((data) => {
    // Create a form data object to send to the server
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("adultCount", data.adultCount);
    formData.append("childCount", data.childCount);
    formData.append("price", data.price);
    formData.append("propertyRating", data.propertyRating);

    // Append each facility to the form data
    data.facilities.forEach((facility, index) =>
      formData.append(`facilities[${index}]`, facility)
    );

    // Append each image file to the form data
    Array.from(data.imageFiles).forEach((imgFile) => {
      formData.append("imageFiles", imgFile);
    });

    // Call the onSave function with the form data
    onSave(formData);
  });

  // Return the form
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit}>
        <BasicDetails />
        <br />
        <br />
        <TypeSection />
        <br />
        <br />
        <FacilitiesSection />
        <br />
        <br />
        <ImagesSection />
        <br />
        <span className="flex justify-end px-3">
          <button
            // Disable the button if the form is submitting
            disabled={isLoading}
            type="submit"
            className="bg-black text-white p-2 rounded-sm font-bold text-sm disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageListingForm;
