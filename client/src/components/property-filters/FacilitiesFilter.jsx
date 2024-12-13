import React from 'react'
import { hotelFacilities } from "../../config/hotelOptions";

const FacilitiesFilter = ({ selectedFacilities, onChange }) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Facilities</h4>
      {hotelFacilities.map((facility) => (
        <label className="flex items-center gap-2" key={facility.label}>
          <input
            type="checkbox"
            className="rounded accent-black"
            value={facility.label}
            checked={selectedFacilities.includes(facility.label)}
            onChange={onChange}
          />
          <span className='w-[13ch] whitespace-nowrap overflow-hidden text-ellipsis'>{facility.label}</span>
        </label>
      ))}
    </div>
  );
}

export default FacilitiesFilter