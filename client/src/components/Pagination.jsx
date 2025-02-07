import React from "react";

const Pagination = ({ page_num, total_pages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= total_pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center">
      <ul className="flex gap-2 ">
        <button
          onClick={() => onPageChange(page_num - 1)}
          disabled={page_num === 1}
          className="text-sm rounded-md w-10 h-10 hover:bg-[#F4F4F5]"
        >
          <i className="fa-solid fa-chevron-left text-xs"></i>
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`flex rounded-md items-center justify-center w-10 h-10 hover:bg-[#F4F4F5] ${
              page_num === number ? "border" : ""
            }`}
            onClick={() => onPageChange(number)}
            disabled={page_num === number}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => onPageChange(page_num + 1)}
          disabled={page_num === total_pages}
          className="text-sm rounded-md w-10 h-10 hover:bg-[#F4F4F5]"
        >
          <i className="fa-solid fa-chevron-right text-xs"></i>
        </button>
      </ul>
    </div>
  );
};

export default Pagination;
