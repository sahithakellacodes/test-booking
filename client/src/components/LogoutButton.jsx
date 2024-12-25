import React from "react";
import * as fetchAPI from "../fetchAPI";
import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  // Get all the hooks we need
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Use useMutation hook to handle data modification (logging out)
  const mutation = useMutation(fetchAPI.logout, {
    onSuccess: async () => {
      showToast({ message: "Logout successful!", type: "success" });
      // Invalidating queries triggers a refetch of the data, ensuring stale data is updated.
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error) => {
      showToast({ message: error.message, type: "error" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  // Return the button
  return (
    <button
      className="text-black bg-[#FFFDF2] p-1 px-2 border-[#FFFDF2] rounded-lg border-2"
      onClick={handleClick}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
