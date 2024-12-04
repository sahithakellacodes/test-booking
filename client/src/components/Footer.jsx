import React from "react";


const Footer = () => {
  return (
    <footer className="flex justify-between bg-black text-white items-center p-4 px-36">
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
