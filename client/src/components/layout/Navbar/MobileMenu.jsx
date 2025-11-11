import React from 'react'
import { Link } from "react-router-dom";
import LogoutButton from "../../ui/LogoutButton";

const MobileMenu = ({ isLoggedIn, onClose }) => {
  return (
    <div className="flex flex-col items-center space-y-2 px-8 py-2 mb-4 font-light">
      <Link to="/listings/create" onClick={onClose}>
        List your property
      </Link>
      {isLoggedIn ? (
        <>
          <Link to="/bookings/viewAll" onClick={onClose}>
            My Bookings
          </Link>
          <Link to="/listings/viewAll" onClick={onClose}>
            My Listings
          </Link>
          <button onClick={onClose}>
            <LogoutButton />
          </button>
        </>
      ) : (
        <>
          <Link to="/user/register" onClick={onClose}>
            Register
          </Link>
          <Link to="/user/login" onClick={onClose}>
            Login
          </Link>
        </>
      )}
    </div>
  );
};

export default MobileMenu
