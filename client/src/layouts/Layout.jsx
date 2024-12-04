import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
// import SearchBar from "../components/SearchBar";

const Layout = ({children}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* <Banner /> */}
      {/* <div className="container mx-auto">
        <SearchBar />
      </div> */}
      <div className="mx-28 py-10 px-36 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
