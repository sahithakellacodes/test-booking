import React from "react";


const Footer = () => {
  return (
    <footer className="flex flex-col items-start md:flex-row md:justify-between bg-black text-white md:items-center p-4 py-3 px-8">
      <a href="/listings" aria-label="View listings" className="font-semibold">
        FindMyStay
      </a>
      <aside className="grid-flow-col items-center">
        <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
      </aside>
    </footer>
  );
};

export default Footer;
