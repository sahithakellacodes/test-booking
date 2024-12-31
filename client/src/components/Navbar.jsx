import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const { isLoggedIn } = useAppContext();
  const [menuToggle, setMenuToggle] = useState(false);
  const navbarBGColor = "#2F3137"; // 31708e
  const menuStyle = "";
  const linkProps = {
    className: menuStyle,
    onClick: () => setMenuToggle(false),
  };

  const handleMenuClick = () => {
    setMenuToggle(!menuToggle);
  };

  return (
    <div
      style={{ backgroundColor: navbarBGColor }}
      className="flex flex-col px-8"
    >
      <div className="py-3 px-8 flex flex-row justify-between place-items-center">
        <div className="navbar-start">
          <span className="text-xl font-bold text-white">
            <Link to="/">
              <i className="fa-regular fa-compass ease-in-out duration-300 hover:rotate-45"></i>
            </Link>
          </span>
        </div>
        <div className="navbar-center hidden lg:block">
          <span>
            <Link
              to="/listings/create"
              className="font-semibold text-white p-2 px-4 rounded-full transition ease-in-out hover:bg-[#202225] "
            >
              List your property
            </Link>
          </span>
        </div>
        <div className="navbar-end space-x-2 align-middle hidden lg:block">
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
        <button onClick={handleMenuClick} className="text-slate-200 lg:hidden">
          {menuToggle ? (
            <i className="fa-solid fa-xmark"></i>
          ) : (
            <i className="fa-solid fa-bars"></i>
          )}
        </button>
      </div>
      {menuToggle && (
        <div className="text-slate-200 flex flex-col items-center space-y-2 px-8 py-2">
          {isLoggedIn ? (
            <>
              <span>
                <Link to="/listings/create" {...linkProps}>
                  List your property
                </Link>
              </span>
              <span>
                <Link to="/bookings/viewAll" {...linkProps}>
                  My Bookings
                </Link>
              </span>
              <span>
                <Link to="/listings/viewAll" {...linkProps}>
                  My Listings
                </Link>
              </span>
            </>
          ) : (
            <>
              <span>
                <Link to="/listings/create" {...linkProps}>
                  List your property
                </Link>
              </span>
              <span>
                <Link to="/user/register" {...linkProps}>
                  Register
                </Link>
              </span>
              <span>
                <Link to="/user/login" {...linkProps}>
                  Login
                </Link>
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
