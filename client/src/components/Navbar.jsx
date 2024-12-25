import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const { isLoggedIn } = useAppContext();
  const navbarBGColor = "#2F3137"; // 31708e
  return (
    <div style={{ backgroundColor: navbarBGColor }} className="py-3 px-8 flex flex-row justify-between place-items-center">
      <div className="navbar-start">
        <span className="text-xl font-bold text-white">
          <Link to="/">
            <i className="fa-regular fa-compass ease-in-out duration-300 hover:rotate-45"></i>
          </Link>
        </span>
      </div>
      <div className="navbar-center">
        <span>
          <Link
            to="/listings/create"
            className="font-semibold text-white p-2 px-4 rounded-full transition ease-in-out hover:bg-[#202225] "
          >
            List your property
          </Link>
        </span>
      </div>
      <div className="navbar-end space-x-2 align-middle">
        {isLoggedIn ? (
          <>
            <span>
              <Link
                to="/bookings/viewAll"
                className="font-semibold text-white p-2 px-4 rounded-full transition ease-in-out hover:bg-[#202225] "
              >
                My Bookings
              </Link>
            </span>
            <span>
              <Link
                to="/listings/viewAll"
                className="font-semibold text-white p-2 px-4 rounded-full transition ease-in-out hover:bg-[#202225] "
              >
                My Listings
              </Link>
            </span>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link
              to="/user/register"
              className="text-black bg-[#FFFDF2] p-1 px-2 border-[#FFFDF2] rounded-lg border-2"
            >
              Register
            </Link>
            <Link
              to="/user/login"
              className="text-black bg-[#FFFDF2] p-1 px-2 border-[#FFFDF2] rounded-lg border-2"
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
