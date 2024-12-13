import React from "react";
import { useAppContext } from "../contexts/AppContext";
import { useSearchContext } from "../contexts/SearchContext";
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

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row items-center justify-between p-3 text-sm overflow-hidden"
    >
      <div
        id="location"
        className="border p-2 rounded-md flex flex-row gap-1 items-center"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      >
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          className="outline-none"
          placeholder="Where are you going?"
        />
      </div>
      <div
        id="dates"
        className="border p-2 rounded-md flex flex-row gap-1 items-center"
      >
        <i className="fa-solid fa-calendar-days"></i>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={setMinDate}
          maxDate={setMaxDate}
          className="focus:outline-none"
        />
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={setMinDate}
          maxDate={setMaxDate}
          className="focus:outline-none"
        />
      </div>
      <div
        id="count"
        className="border p-2 rounded-md flex flex-row gap-1 items-center"
      >
        <i className="fa-solid fa-user mr-2"></i>
        <label className="items-center flex gap-1">
          Adults:
          <input
            type="number"
            className="outline-none mx-2"
            min={1}
            max={20}
            value={adultCount}
            onChange={(e) => setAdultCount(parseInt(e.target.value))}
          />
        </label>
        <label className="items-center flex gap-1">
          Children:
          <input
            type="number"
            className="outline-none mx-2"
            min={0}
            max={20}
            value={childCount}
            onChange={(e) => setChildCount(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div>
        <button className="border border-black p-2 rounded-md hover:bg-black hover:text-white">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
