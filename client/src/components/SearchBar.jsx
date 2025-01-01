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
      className="bg-[#5870DD] text-slate-200 p-[6px] rounded-lg"
    >
      <div className="flex flex-col items-center gap-[6px]">
        {/* <p className="w-full text-left text-sm">Destination</p> */}
        <label className="flex items-center gap-2 w-full bg-[#212328] px-3 py-2 rounded-lg">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            className="bg-[#212328] font-semibold rounded-sm w-full focus:outline-none py-2"
            placeholder="Enter a destination or property"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </label>
        <div id="dates-and-guests" className="w-full flex flex-col gap-[6px]">
          <div className="w-full">
            <label id="dates" className="flex md:flex-col items-center gap-[6px] w-full bg-[#212328] md:bg-[#5870DD] rounded-lg">
              <label className="flex flex-col w-full text-sm bg-[#212328] p-1 px-2 rounded-lg">
                Check-in date
                <DatePicker
                  selected={checkIn}
                  onChange={(date) => setCheckIn(date)}
                  selectsStart
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={setMinDate}
                  maxDate={setMaxDate}
                  className="bg-[#212328] rounded-sm w-full mt-1 font-semibold focus:outline-none text-base"
                />
              </label>
              <label className="flex flex-col w-full text-sm bg-[#212328] p-1 px-2 rounded-lg">
              Check-out date
                <DatePicker
                  selected={checkOut}
                  onChange={(date) => setCheckOut(date)}
                  selectsStart
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={setMinDate}
                  maxDate={setMaxDate}
                  className="bg-[#212328] rounded-sm w-full mt-1 font-semibold focus:outline-none text-base"
                />
              </label>
            </label>
          </div>
          <div className="w-full">
            <label id="guests" className="flex bg-[#212328] items-center gap-2 p-1 px-2 w-full rounded-lg">
              <label className="flex flex-col items-start text-left w-full text-sm">
                Adults:
                <input
                  type="number"
                  className="bg-[#212328] w-full font-semibold py-1 rounded-lg text-base"
                  min={1}
                  max={20}
                  value={adultCount}
                  onChange={(e) => setAdultCount(parseInt(e.target.value))}
                />
              </label>
              <label className="flex flex-col items-start text-left w-full text-sm">
                Children:
                <input
                  type="number"
                  className="bg-[#212328] w-full font-semibold py-1 rounded-lg text-base"
                  min={0}
                  max={20}
                  value={childCount}
                  onChange={(e) => setChildCount(parseInt(e.target.value))}
                />
              </label>
            </label>
          </div>
        </div>
        <button className="bg-[#ffe089] hover:bg-[#ffd970] font-semibold text-black rounded-lg p-2 w-full">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
