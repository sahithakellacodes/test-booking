import React from "react";

const Pagination = ({ page_num, total_pages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i < total_pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center">
      <ul className="flex gap-2 ">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`flex items-center justify-center w-10 h-10 border-2 border-slate-300 ${
              page_num === number ? "bg-slate-700 text-white" : ""
            }`}
            onClick={() => onPageChange(number)}
            disabled={page_num === number}
          >
            {number}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
