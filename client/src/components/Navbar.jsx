import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const { isLoggedIn } = useAppContext();
  const [menuToggle, setMenuToggle] = useState(false);
  const menuStyle = "";
  const linkProps = {
    className: menuStyle,
    onClick: () => setMenuToggle(false),
  };

  const handleMenuClick = () => {
    setMenuToggle(!menuToggle);
  };

  // Local components
  const FindMyStayLogo = () => (
    <div className="navbar-start">
      <span className="text-xl font-bold">
        <Link to="/" className="space-x-2">
          <i className="fa-regular fa-compass ease-in-out duration-300 hover:rotate-45"></i>
          <span className="hidden lg:inline">FindMyStay</span>
        </Link>
      </span>
    </div>
  );
  const ListYourProperty = () => (
    <div className="navbar-center hidden lg:block">
      <span>
        <Link
          to="/listings/create"
          className="font-normal text-[#484850] hover:text-black p-2 px-4 rounded-full transition ease-in-out"
        >
          List your property
        </Link>
      </span>
    </div>
  );
  const MenuToggleButton = () => (
    <button onClick={handleMenuClick} className="lg:hidden">
      {menuToggle ? (
        <i className="fa-solid fa-xmark"></i>
      ) : (
        <i className="fa-solid fa-bars"></i>
      )}
    </button>
  );
  const NavbarMenuHorizontal = () => (
    <div className="navbar-end space-x-2 align-middle hidden lg:block">
      {isLoggedIn ? (
        <>
          <span>
            <Link
              to="/bookings/viewAll"
              className="bg-[#f6f6f6] rounded-md px-4 py-2"
            >
              My Bookings
            </Link>
          </span>
          <span>
            <Link
              to="/listings/viewAll"
              className="bg-[#f6f6f6] rounded-md px-4 py-2"
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
            className="bg-[#f6f6f6] rounded-md px-4 py-2"
          >
            Register
          </Link>
          <Link
            to="/user/login"
            className="text-white bg-black rounded-md px-4 py-2"
          >
            Login
          </Link>
        </>
      )}
    </div>
  );
  const NavbarMenuVertical = () => (
    <div className="flex flex-col items-center space-y-2 px-8 py-2 mb-4 font-light">
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
          <button onClick={() => setMenuToggle(false)}>
            <LogoutButton />
          </button>
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
  );

  return (
    <div className="flex flex-col px-4 md:px-8 bg-white border-b">
      <div className="py-3 px-4 md:px-8 flex flex-row justify-between place-items-center">
        <FindMyStayLogo />
        <ListYourProperty />
        <NavbarMenuHorizontal />
        <MenuToggleButton />
      </div>
      {menuToggle && <NavbarMenuVertical />}
    </div>
  );
};

export default Navbar;
