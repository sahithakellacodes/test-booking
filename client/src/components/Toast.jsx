import React, { useEffect } from "react";
import { FaRegCircleXmark, FaRegCircleCheck } from "react-icons/fa6";

const Toast = ({ message, type, onClose }) => {
  // Use useEffect to close the toast after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      // setToast(undefined);
      onClose();
    }, 2000); // 2s

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  // Set the style based on the type of toast
  const typeStyle =
    type === "success"
      ? "fixed top-4 right-4 z-50 p-4 rounded-md text-white max-w-md bg-green-600"
      : "fixed top-4 right-4 z-50 p-4 rounded-md text-white max-w-md bg-red-600";

  // Return the toast component
  return (
    <div className={typeStyle}>
      <div className="flex justify-center items-center space-x-2">
        {type === "success" ? <FaRegCircleCheck /> : <FaRegCircleXmark />}
        <span className="text-lg">{message} </span>
      </div>
    </div>
  );
};

export default Toast;
