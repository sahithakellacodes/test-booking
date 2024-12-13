import React from "react";

const PriceFilter = ({ maxPrice, onChange }) => {
  return (
    <div className="border-b border slate-300 p-2">
      <h4 className="text-md font-semibold mb-2">Max Price</h4>
      <select
      className="border rounded-md w-full"
        value={maxPrice}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      >
        <option value="">Select Max Price</option>
        {[50, 100, 200, 300, 500, 1000, 10000, 3000000].map((price) => (
          <option key={price} value={price}>
            {price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
