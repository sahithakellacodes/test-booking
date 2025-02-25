import React from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const GuestInfoForm = ({ listingId, price }) => {
  // Get all the hooks and context values needed
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // Initialize the form with the search values
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(minDate.getDate() + 365);

  // Form submission when user is not signed in: Save the search values and redirect to the login page
  const onSignInClick = (data) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    // Redirect to the login page with the current location as the state
    // so that the user can be redirected back to the same page after login
    console.log("location.pathname in guest info form", location.pathname);
    navigate("/user/login", { state: { from: location.pathname } });
  };

  // Form submission when user is signed in: Save the search values and redirect to the booking page
  const onSubmit = (data) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/listings/${listingId}/book`);
  };

  // Return the guest info form
  return (
    <div className="flex flex-col p-4  gap-4 border rounded-lg shadow-xl shadow-gray-50">
      <h3 className="text-md font-bold">INR {price} per night</h3>
      {/* REVIEW: Not sure if this form submission is safe */}
      <form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full border p-2 mt-1 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 w-full"
              wrapperClassName="min-w-full"
            />
          </div>
          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-out Date"
              className="min-w-full border p-2 mt-1 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 w-full"
              wrapperClassName="min-w-full"
            />
          </div>
          <div
            id="count"
            className="p-2 rounded-md flex flex-row space-x-3 items-center"
          >
            <i className="fa-solid fa-user mr-2"></i>
            <label className="items-center flex gap-1 flex-grow">
              Adults:
              <input
                type="number"
                className="border p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 w-full"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "At least 1 adult required",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            <label className="items-center flex gap-1 flex-grow">
              Children:
              <input
                type="number"
                className="border p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 w-full"
                min={0}
                max={20}
                {...register("childCount", {
                  required: "This field is required",
                  min: 0,
                  valueAsNumber: true,
                })}
              />
            </label>
          </div>
          {isLoggedIn ? (
            <button className="bg-[#2F3137] rounded-lg text-white h-full p-2 font-bold  text-xl">
              Book Now
            </button>
          ) : (
            <button className="bg-[#2F3137] rounded-lg text-white h-full p-2 font-bold  text-xl">
              Login to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
