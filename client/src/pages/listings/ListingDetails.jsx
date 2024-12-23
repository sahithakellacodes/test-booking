import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as fetchAPI from "../../fetchAPI";
import { hotelTypes } from "../../config/hotelOptions";
import GuestInfoForm from "../../forms/GuestInfoForm/GuestInfoForm";

const ListingDetails = () => {
  // Get the listingId from the URL
  const { listingId } = useParams();

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

  if (data === undefined) {
    return <div>Loading...</div>;
  }

  // Return the listing details and the guest info form
  return (
    <div>
      <span>ListingID: {listingId}</span>
      <div className="flex flex-col">
        <div id="name-and-stars" className="flex justify-between">
          <h3 className="font-bold text-xl">{data.name}</h3>
          <span>
            <i className="mr-4">{data.type}</i>
            {Array.from({ length: data.propertyRating }).map((_, index) => (
              <i key={index} className="fa-solid fa-star text-yellow-400"></i>
            ))}
          </span>
        </div>

        <div
          id="images-and-map"
          className="grid grid-cols-1 lg:grid-cols-3 gap-4"
        >
          {data.images.slice(0, 2).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={data.name}
              className="rounded-md w-full h-72 object-cover object-center"
            />
          ))}
          {/* {coordinates && (
            <MapComponent location={} />
          )} */}
        </div>

        <div id="facilities" className="">
          <ul className="m-1 grid grid-cols-4">
            {/* TODO: Add facilities icons */}
            {data.facilities.map((item, index) => (
              <li key={index} className="m-1 p-2 border rounded-md">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div
          id="desc-and-booking"
          className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3"
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
