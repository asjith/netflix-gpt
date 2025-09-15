import React from "react";
import { LOGIN_BACKGROUND } from "../utils/constants";

const GptSearchBar = () => {
  return (
    <div className="p-[2%] m-[25%] bg-black w-2/3 rounded-lg text-xs sm:text-sm md:m-[20%] lg:m-[15%]">
      <form className="grid grid-cols-12 ">
        <input
          className="col-span-9 m-1 p-2 rounded-sm lg:col-span-10"
          placeholder="Enter"
        />
        <button className="col-span-3 m-1 p-2 border border-red-700 bg-red-700 font-semibold text-white rounded-sm lg:col-span-2">
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
