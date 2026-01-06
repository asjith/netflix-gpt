import React from "react";
import errorURL from "../icons/error.png";

const Error = ({ handleRetry }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-96 text-white">
      <img src={errorURL} alt="error" />
      <h1 className="text-center text-xl">Sorry, something went wrong</h1>
      <p>Please try again</p>
      <button
        className="px-4 py-1 rounded-full bg-red-600"
        type="button"
        onClick={handleRetry}
      >
        Retry
      </button>
    </div>
  );
};

export default Error;
