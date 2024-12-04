import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as fetchAPI from "../fetchAPI";

// 1. Create the Context
const AppContext = React.createContext(undefined);

// 2. Create the Provider Component that wraps the entire app to manage state
export const AppContextProvider = ({ children }) => {
  // 2.1 State or data to be shared across the app
  const [toast, setToast] = useState(undefined);

  // 2.2 Methods or functions to modify the shared state
  // calls our validate token endpoint to check if the user is logged in
  const { isError } = useQuery("validateToken", fetchAPI.validateToken, {
    retry: false,
  });

  return (
    <AppContext.Provider
      // 2.3 Values to be shared across the app
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError, // if no error, we are logged in
        // stripePromise,
      }}
    >
      {/* 2.4 Return provider component wrapping it's children */}
      {toast && ( // if toast is not undefined, render the Toast component
        <Toast 
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use useContext and AppContext that is accessible to all components
export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
