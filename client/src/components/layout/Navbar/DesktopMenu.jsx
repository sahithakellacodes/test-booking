import React from 'react'
import { Link } from "react-router-dom";
import LogoutButton from "../../ui/LogoutButton";

const DesktopMenu = ({ isLoggedIn }) => {
  return (
    <div className="hidden lg:flex space-x-2 items-center">
      {isLoggedIn ? (
        <>
          <Link to="/bookings/viewAll" className="bg-[#f6f6f6] rounded-md px-4 py-2">
            My Bookings
          </Link>
          <Link to="/listings/viewAll" className="bg-[#f6f6f6] rounded-md px-4 py-2">
            My Listings
          </Link>
          <LogoutButton />
        </>
      ) : (
        <>
          <Link to="/user/register" className="bg-[#f6f6f6] rounded-md px-4 py-2">
            Register
          </Link>
          <Link to="/user/login" className="text-white bg-black rounded-md px-4 py-2">
            Login
          </Link>
        </>
      )}
    </div>
  );
};

export default DesktopMenu