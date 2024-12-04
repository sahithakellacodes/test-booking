import React from "react";
import ManageListingForm from "../../forms/ManageListingForm/ManageListingForm";
import { useMutation } from "react-query";
import { useAppContext } from "../../contexts/AppContext";
import * as fetchAPI from "../../fetchAPI";
import { useForm } from "react-hook-form";

const AddListing = () => {
  // Get all the hooks we need
  const { showToast } = useAppContext();

  // Use useMutation hook to handle data modification (adding/creating a listing)
    // Here, we are directly destructuring mutate from useMutation, so don't worry about why we are not using mutation.mutate
  const { mutate, isLoading } = useMutation(fetchAPI.addListing, {
    onSuccess: () => {
      showToast({ message: "Listing added successfully!", type: "success" });
    },
    onError: (error) => {
      console.log(error);
      showToast({ message: "Error adding listing", type: "error" });
    },
  });

  const handleSave = (data) => {
    try{
      for (let pair of data.entries()) {
        console.log("FormDataOBJ00:", pair[0] + ': ' + pair[1]);
      }
      mutate(data);
    }
    catch(error){
      console.error("Error mutating data:", error);
    }
  }

  // Return the form
  return <ManageListingForm onSave={handleSave} isLoading={isLoading} />;
  // isLoading is used to disable the submit button while the form is submitting
};

export default AddListing;
