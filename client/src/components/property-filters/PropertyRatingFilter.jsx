import React from "react";

const PropertyRatingFilter = ({ selectedStars, onChange }) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Property Rating</h4>
      {[5, 4, 3, 2, 1].map((star) => (
        <label className="flex items-center gap-2" key={star}>
          <input
            type="checkbox"
            className="rounded accent-black"
            value={star}
            checked={selectedStars.includes(star)}
            onChange={onChange}
          />
          <span>{star} stars</span>
        </label>
      ))}
    </div>
  );
};

export default PropertyRatingFilter;
