import React from "react";
import noResultsURL from "../icons/noResults.png";

const NoResultsFound = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-80 text-white">
      <img className="w-20 h-20" src={noResultsURL} alt="no-results-found" />
      <h1 className="text-xl ">No results found</h1>
      <p className="text-sm">Try different keywords or remove search filters</p>
    </div>
  );
};

export default NoResultsFound;
