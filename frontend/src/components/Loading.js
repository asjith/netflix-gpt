import React from "react";
import loadingURL from "../icons/loading.png";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-96">
      <img className="rotate w-10 h-10" src={loadingURL} alt="loading" />
    </div>
  );
};

export default Loading;
