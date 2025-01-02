import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as fetchAPI from "../../fetchAPI";
import { hotelTypes } from "../../config/hotelOptions";
import GuestInfoForm from "../../forms/GuestInfoForm/GuestInfoForm";
import MapComponent from "../../components/MapComponent";
import { useEffect } from "react";

const ListingDetails = () => {
  // Get the listingId from the URL
  const [coordinates, setCoordinates] = React.useState(null);
  const { listingId } = useParams();
  const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

  // Get the listing details from the API using react query
  // Sometimes react rerenders the component multiple times before the listingId is available
  // This will prevent the API call until the listingId is available
  const { data } = useQuery(
    "getListingDetailsById",
    () => fetchAPI.getListingDetailsById(listingId),
    {
      enabled: !!listingId,
    }
  );

  const location = data?.city + data?.country;
  const fetchCoordinates = async (location) => {
    try {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        location
      )}&key=${API_KEY}`;
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      const { lat, lng } = data.results[0].geometry.location;
      setCoordinates({ lat, lng });
    } catch (error) {
      console.log("Error fetching coordinates", error);
    }
  };

  useEffect(() => {
    if (location) {
      fetchCoordinates(location);
    }
  }, [location, API_KEY]);

  // If the data is not available, show a loading message
  if (data === undefined || coordinates === null) {
    return <div>Loading...</div>;
  }

  // Return the listing details and the guest info form
  return (
    <div>
      <div className="flex flex-col">
        <div id="name-and-stars" className="flex justify-between mb-3">
          <h3 className="font-bold text-xl text-[#cac9c9]">{data.name}</h3>
          <span>
            <i className="mr-4 text-[#cac9c9]">{data.type}</i>
            {Array.from({ length: data.propertyRating }).map((_, index) => (
              <i key={index} className="fa-solid fa-star text-yellow-400"></i>
            ))}
          </span>
        </div>

        <div
          id="images-and-map"
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {data.images.slice(0, 2).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={data.name}
              className="rounded-md w-full h-72 object-cover object-center"
            />
          ))}
          {coordinates && (
            <MapComponent location={coordinates} />
          )}
        </div>

        <div id="facilities" className="">
          <ul className="m-1 grid grid-cols-2 md:grid-cols-4">
            {/* TODO: Add facilities icons */}
            {data.facilities.map((item, index) => (
              <li
                key={index}
                className="m-1 p-2 rounded-md border text-slate-200 duration-500 border-[#2F3137] bg-[#2F3137] hover:bg-[#13181C] hover:border-[#174157]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div
          id="desc-and-booking"
          className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3"
        >
          <div
            id="description"
            className="whitespace-pre-line text-justify text-[#cac9c9]"
          >
            {data.description}
          </div>
          <div id="booking-card" className="h-fit">
            <GuestInfoForm price={data.price} listingId={listingId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
