import React from "react";
import Navbar from "../components/layout/Navbar";
import Banner from "../components/layout/Banner";
import Footer from "../components/layout/Footer";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {location.pathname === "/" && <Banner />}
      <div className="py-10 px-4 lg:px-12 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
