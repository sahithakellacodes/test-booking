import React from "react";
import { useSearchContext } from "../../contexts/SearchContext";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(search.destination);
  const [checkIn, setCheckIn] = useState(search.checkIn);
  const [checkOut, setCheckOut] = useState(search.checkOut);
  const [adultCount, setAdultCount] = useState(search.adultCount);
  const [childCount, setChildCount] = useState(search.childCount);

  const setMinDate = new Date();
  const setMaxDate = new Date();
  setMaxDate.setFullYear(setMaxDate.getFullYear() + 1);

  const handleSubmit = (event) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  // Local components
  const Destination = () => (
    <label id="destination-search-bar" className="flex flex-col flex-grow">
      Destination
      <input
        type="text"
        className="border p-2 mt-1 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
        placeholder="Enter a destination or property"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
    </label>
  );
  const DatePickerCheckIn = () => (
    <DatePicker
      selected={checkIn}
      onChange={(date) => setCheckIn(date)}
      selectsStart
      startDate={checkIn}
      endDate={checkOut}
      minDate={setMinDate}
      maxDate={setMaxDate}
      className="border p-2 mt-1 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 w-full"
    />
  );
  const DatePickerCheckOut = () => (
    <DatePicker
      selected={checkOut}
      onChange={(date) => setCheckOut(date)}
      selectsStart
      startDate={checkIn}
      endDate={checkOut}
      minDate={setMinDate}
      maxDate={setMaxDate}
      className="border p-2 mt-1 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 w-full"
    />
  );
  const ChooseAdultNumber = () => (
    <label id="adults" className="flex flex-col flex-grow">
      Adults:
      <input
        type="number"
        className="border p-2 mt-1 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
        min={1}
        max={20}
        value={adultCount}
        onChange={(e) => setAdultCount(parseInt(e.target.value))}
      />
    </label>
  );
  const ChooseChildNumber = () => (
    <label id="children" className="flex flex-col flex-grow">
      Children:
      <input
        type="number"
        className="border p-2 mt-1 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
        min={0}
        max={20}
        value={childCount}
        onChange={(e) => setChildCount(parseInt(e.target.value))}
      />
    </label>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="sm:mx-10 p-4 sm:p-6 border rounded-lg shadow-xl shadow-gray-50"
    >
      <div id="container" className="flex flex-col lg:flex-row gap-5">
        <Destination />
        <div id="dates-div" className="flex flex-row space-x-3 flex-grow">
          <label className="flex flex-col flex-grow">
            Check-in date
            <DatePickerCheckIn />
          </label>
          <label className="flex flex-col flex-grow">
            Check-out date
            <DatePickerCheckOut />
          </label>
        </div>
        <div id="guests-div" className="flex flex-row space-x-3 flex-grow">
          <ChooseAdultNumber />
          <ChooseChildNumber />
        </div>
        <div className="flex flex-col justify-end">
          <button className="text-white bg-black rounded-md h-fit px-4 py-2">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
