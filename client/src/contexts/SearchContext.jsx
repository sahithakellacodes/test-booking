import React, { useContext, useState } from "react";

// 1. Create the Context
const SearchContext = React.createContext(undefined);

// 2. Create the context provider component
export const SearchContextProvider = ({ children }) => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [listingId, setListingId] = useState("");

  const saveSearchValues = (
    destination,
    checkIn,
    checkOut,
    adultCount,
    childCount,
    listingId,
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);
    if (listingId) {
      setListingId(listingId);
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
