import React from "react";
import { hotelTypes } from "../../config/hotelOptions";

const ListingTypesFilter = ({ selectedTypes, onChange }) => {
  return (
    <div className="border-b pb-5 ">
      <h4 className="text-md font-semibold mb-2">Property Type</h4>
      {hotelTypes.map((type) => (
        <label className="flex items-center gap-2" key={type.label}>
          <input
            type="checkbox"
            className="rounded accent-black"
            value={type.label}
            checked={selectedTypes.includes(type.label)}
            onChange={onChange}
          />
          <span>{type.label}</span>
        </label>
      ))}
    </div>
  );
};

export default ListingTypesFilter;
