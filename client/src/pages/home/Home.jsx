import React from "react";
import { useQuery } from "react-query";
import * as fetchAPI from "../../fetchAPI";
import SearchResultCard from "../search/SearchResultCard";

const Home = () => {
  const { data, isLoading, isError } = useQuery("fetchListings", () =>
    fetchAPI.fetchRecentListings()
  );

  return (
    <div id="home" className="">
      <h2 className="text-slate-200 font-semibold text-xl my-6 md:text-3xl md:my-10 text-center">
        Recently Added Stays
      </h2>
      <div
        id="recently-added-hotels"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-16 lg:mx-14 flex-1"
      >
        {
            data ? 
            data.map((listing) => (
              <div key={listing._id}>
                <SearchResultCard key={listing._id} listing={listing} />
              </div>
            )) : null
        }
      </div>
    </div>
  );
};

export default Home;
