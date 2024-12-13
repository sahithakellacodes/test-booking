import React from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import * as fetchAPI from "../../fetchAPI";
import ManageListingForm from "../../forms/ManageListingForm/ManageListingForm";
import { useAppContext } from "../../contexts/AppContext";

const EditListing = () => {
  const { listingId } = useParams();
  const { showToast } = useAppContext();

  // Fetch listing by ID
  const { data: listing } = useQuery(
    ["listings", listingId],
    // "listings",
    () => fetchAPI.getListingByID(listingId),
    {
      enabled: !!listingId,
      onSuccess: (data) => {
        console.log("Data fetched successfully");
      },
      onError: (error) => {
        console.log("Error fetching data");
      },
    }
  );

  // Update listing by ID
  const { mutate, isLoading } = useMutation(({listingId, data}) => fetchAPI.updateListingByID(listingId, data), {
    onSuccess: () => {
      showToast({ message: "Listing updated successfully!", type: "success" });
    },
    onError: (error) => {
      console.log(error);
      showToast({ message: "Error updating listing", type: "error" });
    },
  });

  // Handle save
  const handleSave = (data) => {
    console.log("DATA IN HANDLE SAVE FXN")
    for (let pair of data.entries()) {
      console.log("FormDataOBJ00:", pair[0] + ": " + pair[1]);
    }
    mutate({listingId, data});
  };

  if (!listing) return <div>No listing found.</div>;

  return <ManageListingForm onSave={handleSave} listingDetails={listing} isLoading={isLoading} />;
};

export default EditListing;
