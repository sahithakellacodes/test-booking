import React from "react";

const SortingOption = ({ sortOption, onChange }) => {
  return (
    <div>
      <select
        value={sortOption}
        onChange={onChange}
        className="p-2 border rounded-md"
      >
        <option value="">Sort By</option>
        <option value="rating-desc">Property Rating (high to low)</option>
        <option value="rating-asc">Property Rating (low to high)</option>
        <option value="price-asc">Price Per Night (low to high)</option>
        <option value="price-desc">Price Per Night (high to low)</option>
      </select>
    </div>
  );
};

export default SortingOption;
