import React from "react";
import { useSearchContext } from "../../contexts/SearchContext";
import { useQuery } from "react-query";
import * as fetchAPI from "../../fetchAPI";
import SearchResultCard from "./SearchResultCard";
import Pagination from "../../components/Pagination";
import PropertyRatingFilter from "../../components/property-filters/PropertyRatingFilter";
import ListingTypesFilter from "../../components/property-filters/ListingTypesFilter";
import FacilitiesFilter from "../../components/property-filters/FacilitiesFilter";
import PriceFilter from "../../components/property-filters/PriceFilter";
import SortingOption from "../../components/property-filters/SortingOption";

const Search = () => {
  // Contexts and States
  const search = useSearchContext();
  const [page, setPage] = React.useState(1);
  const [selectedStars, setSelectedStars] = React.useState([]);
  const [selectedTypes, setSelectedTypes] = React.useState([]);
  const [selectedFacilities, setSelectedFacilities] = React.useState([]);
  const [maxPrice, setMaxPrice] = React.useState();
  const [sortOption, setSortOption] = React.useState("");
  const [filterToggle, setFilterToggle] = React.useState(false);

  const handleToggle = () => {
    setFilterToggle(!filterToggle);
  };

  // Search Parameters
  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedTypes,
    facilities: selectedFacilities,
    maxPrice: maxPrice?.toString(),
    sortOption,
  };

  // Getting data as per requirement from DB though fetchAPI
  const { data, isLoading, isError } = useQuery(
    ["searchListings", searchParams],
    () => fetchAPI.searchListings(searchParams)
  );

  const handleStarChange = (e) => {
    const starValue = parseInt(e.target.value);

    if (selectedStars.includes(starValue)) {
      setSelectedStars(selectedStars.filter((star) => star !== starValue));
    } else {
      setSelectedStars([...selectedStars, starValue]);
    }
  };

  const handleTypeChange = (e) => {
    const typeValue = e.target.value;

    if (selectedTypes.includes(typeValue)) {
      setSelectedTypes(selectedTypes.filter((type) => type !== typeValue));
    } else {
      setSelectedTypes([...selectedTypes, typeValue]);
    }
  };

  const handleFacilityChange = (e) => {
    const facilityValue = e.target.value;
    if (selectedFacilities.includes(facilityValue)) {
      setSelectedFacilities(
        selectedFacilities.filter((facility) => facility !== facilityValue)
      );
    } else {
      setSelectedFacilities([...selectedFacilities, facilityValue]);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data.</div>;
  }

  // Check if the data is a valid array
  const validData = Array.isArray(data?.data) ? data.data : [];

  // Local components
  const Filters = ({ style }) => (
    <div id="filters" className="rounded-lg h-fit top-10">
      <div className={style}>
        <div className="space-y-5">
          <h3 className="text-lg  font-semibold border-b  pb-5">Filter by:</h3>
          <PropertyRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarChange}
          />
          <ListingTypesFilter
            selectedTypes={selectedTypes}
            onChange={handleTypeChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <PriceFilter
            maxPrice={maxPrice}
            onChange={(value) => setMaxPrice(value)}
          />
        </div>
      </div>
    </div>
  );
  const CrossButton = () => (
    <button onClick={handleToggle} className="text-slate-200 mr-2 lg:hidden">
      <i className="fa-solid fa-xmark"></i>
    </button>
  );
  const FilterButton = () => (
    <button onClick={handleToggle} className="mr-2 lg:hidden">
      <i className="fa-solid fa-filter"></i>
    </button>
  );
  const NoResultsFound = () => (
    <div>
      <span className="text-xl  font-semibold">No results found.</span>
    </div>
  );
  const ResultsCount = () => (
    <span className="text-xl font-semibold">
      {data.meta.total} results found{" "}
      {search.destination ? ` in ${search.destination}` : ""}
    </span>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 mt-8 sm:mx-10">
      <Filters style="rounded-lg border shadow-xl shadow-gray-50 p-5 h-fit sticky top-10 hidden lg:block mt-8" />
      {validData.length === 0 ? (
        <NoResultsFound />
      ) : (
        <div id="body" className="flex flex-col gap-5">
          <div
            id="result-cnt-and-sorting"
            className="flex flex-row justify-between items-center"
          >
            <ResultsCount />
            <span className="hidden lg:block">
              <SortingOption
                sortOption={sortOption}
                onChange={(event) => setSortOption(event.target.value)}
              />
            </span>
            {/* Filter button for mobile */}
            {filterToggle ? <CrossButton /> : <FilterButton />}
          </div>
          {filterToggle ? (
            <Filters style="rounded-lg border border-slate-300 p-5 h-fit sticky top-10" />
          ) : (
            <div className="flex flex-col gap-5">
              <div
                id="results"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 flex-1"
              >
                {data
                  ? data.data.map((listing) => (
                      <div key={listing._id}>
                        <SearchResultCard key={listing._id} listing={listing} />
                      </div>
                    ))
                  : null}
              </div>
              <div id="pagination">
                <Pagination
                  page_num={data.meta.page || 1}
                  total_pages={data.meta.pages || 1}
                  onPageChange={(newPage) => setPage(newPage)}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
