import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
// import SearchBar from "../components/SearchBar";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  // const childrenStyle = "container mx-auto py-10 flex-1";
  const childrenStyle = "py-10 px-36 lg:px-48 flex-1";
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {location.pathname === "/" && <Banner />}
      <div className="py-10 px-3 md:px-8 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
