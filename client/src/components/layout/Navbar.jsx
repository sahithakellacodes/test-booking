import React, { useState } from "react";
import { useAppContext } from "../../contexts/AppContext";
import MobileMenu from "./Navbar/MobileMenu";
import DesktopMenu from "./Navbar/DesktopMenu";
import NavbarLogo from "./Navbar/NavbarLogo";
import ListYourPropertyLink from "./Navbar/ListYourPropertyLink";


const Navbar = () => {
  const { isLoggedIn } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((previousState) => !previousState);

  return (
    <div className="flex flex-col px-4 md:px-8 bg-white border-b">
      {/* Top row */}
      <div className="py-3 px-4 md:px-8 flex justify-between items-center">
        <NavbarLogo />
        <div className="hidden lg:block">
          <ListYourPropertyLink />
        </div>
        <DesktopMenu isLoggedIn={isLoggedIn} />
        <button onClick={toggleMenu} className="lg:hidden">
          <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && <MobileMenu isLoggedIn={isLoggedIn} />}
    </div>
  );
};

export default Navbar;
