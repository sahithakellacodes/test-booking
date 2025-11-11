import React from "react";
import { Link } from "react-router-dom";

const NavbarLogo = () => {
  return (
    <Link to="/" className="text-xl font-bold space-x-2">
      <i className="fa-regular fa-compass transition-transform hover:rotate-45" />
      <span className="hidden lg:inline">FindMyStay</span>
    </Link>
  );
};

export default NavbarLogo;
