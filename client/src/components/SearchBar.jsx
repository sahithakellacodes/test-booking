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
      className="flex justify-center bg-[#2F3137] font-semibold text-white items-center text-sm overflow-hidden border-2 border-[#31708e] rounded-lg"
    >
      <div className="flex flex-row justify-between items-center gap-4 p-4">
        <label className="flex flex-col gap-1 w-96">
          Search your destination
          <input
            type="text"
            className="outline-none font-normal text-black bg-[#FFFDF2] p-2 rounded-md"
            placeholder="Enter destination or property name"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </label>
        <label className="flex flex-row gap-6">
          <label className="flex flex-col gap-2 items-start w-40">
            Check-inㅤ
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={setMinDate}
              maxDate={setMaxDate}
              className="focus:outline-none outline-none font-normal text-black bg-[#FFFDF2] p-2 rounded-md"
            />
          </label>
          <label className="flex flex-col gap-2 items-start w-40">
            Check-out
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={setMinDate}
              maxDate={setMaxDate}
              className="focus:outline-none outline-none font-normal text-black bg-[#FFFDF2] p-2 rounded-md"
            />
          </label>
        </label>
        <label className="flex flex-row gap-6">
          <label className="flex flex-col gap-2 items-start">
            Adults:
            <input
              type="number"
              className="outline-none mx-2 font-normal text-black bg-[#FFFDF2] p-2 rounded-md"
              min={1}
              max={20}
              value={adultCount}
              onChange={(e) => setAdultCount(parseInt(e.target.value))}
            />
          </label>
          <label className="flex flex-col gap-2 items-start">
            Children:
            <input
              type="number"
              className="outline-none mx-2 font-normal text-black bg-[#FFFDF2] p-2 rounded-md"
              min={0}
              max={20}
              value={childCount}
              onChange={(e) => setChildCount(parseInt(e.target.value))}
            />
          </label>
        </label>
        <button className="border bg-[#FFFDF2] text-black border-black p-2 rounded-md hover:bg-[#f3efda]">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
