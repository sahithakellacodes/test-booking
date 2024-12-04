import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-black py-6 px-36 flex flex-row justify-between place-items-center">
      <div className="navbar-start">
        <span className="text-2xl font-bold text-white">
          <Link to="/">FindMyStay</Link>
        </span>
      </div>
      <div className="navbar-center">
        <span>
          <Link
            to="/listings/create"
            className="font-semibold text-white p-3 transition ease-in-out hover:bg-white hover:text-black rounded-sm"
          >
            List your property
          </Link>
        </span>
      </div>
      <div className="navbar-end space-x-2 align-middle">
        {isLoggedIn ? (
          <>
            <span>
              <Link to="/" className="font-semibold text-white p-3 transition ease-in-out hover:bg-white hover:text-black rounded-sm">My Bookings</Link>
            </span>
            <span>
              <Link to="/listings/viewAll" className="font-semibold text-white p-3 transition ease-in-out hover:bg-white hover:text-black rounded-sm">My Listings</Link>
            </span>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link
              to="/user/register"
              className="text-black bg-white p-2 border-gray-600 rounded-md border-2"
            >
              Register
            </Link>
            <Link
              to="/user/login"
              className="text-black bg-white p-2 border-gray-600 rounded-md border-2"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
