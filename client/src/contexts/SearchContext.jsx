import React, { useContext, useState } from "react";

// 1. Create the Context
const SearchContext = React.createContext(undefined);

// 2. Create the context provider component
export const SearchContextProvider = ({ children }) => {
  // Initialize the search values from the session storage or set default values
  const [destination, setDestination] = useState(
    () => sessionStorage.getItem("destination") || ""
  );
  const [checkIn, setCheckIn] = useState(
    () =>
      new Date(sessionStorage.getItem("checkIn") || new Date().toISOString())
  );
  
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  let updatedISOString = currentDate.toISOString();

  const [checkOut, setCheckOut] = useState(
    () =>
      new Date(sessionStorage.getItem("checkOut") || updatedISOString)
  );
  const [adultCount, setAdultCount] = useState(
    () => parseInt(sessionStorage.getItem("adultCount")) || 1
  );
  const [childCount, setChildCount] = useState(
    () => parseInt(sessionStorage.getItem("childCount")) || 0
  );
  const [listingId, setListingId] = useState(
    () => sessionStorage.getItem("listingId") || ""
  );

  const saveSearchValues = (
    destination,
    checkIn,
    checkOut,
    adultCount,
    childCount,
    listingId
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);
    if (listingId) {
      setListingId(listingId);
    }

    // Save the search values to the session storage
    console.log(checkIn, checkOut);
    sessionStorage.setItem("destination", destination);
    sessionStorage.setItem("checkIn", checkIn.toISOString());
    sessionStorage.setItem("checkOut", checkOut.toISOString());
    sessionStorage.setItem("adultCount", adultCount.toString());
    sessionStorage.setItem("childCount", childCount.toString());
    if (listingId) {
      sessionStorage.setItem("listingId", listingId);
    }
  };

  const values = {
    destination,
    checkIn,
    checkOut,
    adultCount,
    childCount,
    listingId,
    saveSearchValues,
  };

  return (
    <SearchContext.Provider value={values}>{children}</SearchContext.Provider>
  );
};

// 3. Create a custom hook to use the SearchContext
export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context;
};
