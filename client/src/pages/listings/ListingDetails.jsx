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
  const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY || "";

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
      // const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      //   location
      // )}&key=${API_KEY}`;
      // const response = await fetch(geocodeUrl);
      // const data = await response.json();
      const lat = -20.18705;
      const lng = 78.07116;
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
    <div className="sm:mx-10">
      <div className="flex flex-col">
        <div id="name-and-stars" className="flex justify-between mb-7">
          <h3 className="font-bold text-xl">{data.name}</h3>
          <span>
            <i className="mr-4 font-light">{data.type}</i>
            {Array.from({ length: data.propertyRating }).map((_, index) => (
              <i key={index} className="fa-solid fa-star text-yellow-400"></i>
            ))}
          </span>
        </div>

        <div
          id="images-and-map"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {data.images.slice(0, 2).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={data.name}
              className="rounded-md w-full h-72 object-cover object-center"
            />
          ))}
          {coordinates ? (
            <div className="m-auto">
              <img className="w-6" src="https://i.gifer.com/ZKZg.gif"></img>
            </div>
          ) : (
            <MapComponent location={coordinates} />
          )}
        </div>

        <div id="facilities" className="mb-8">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {/* TODO: Add facilities icons */}
            {data.facilities.map((item, index) => (
              <li key={index} className="p-3 rounded-md border font-light">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div
          id="desc-and-booking"
          className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8"
        >
          <div id="description" className="whitespace-pre-line text-justify">
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
