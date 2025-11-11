import React from 'react'
import { Link } from "react-router-dom";

const ListYourPropertyLink = () => {
  return (
    <Link
      to="/listings/create"
      className="font-normal text-[#484850] hover:text-black p-2 px-4 rounded-full transition"
    >
      List your property
    </Link>
  )
}
export default ListYourPropertyLink