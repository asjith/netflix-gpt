import React from "react";
import { useSelector } from "react-redux";
import warningURL from "../icons/warning.png";

const ImmediateOfflineDetection = () => {
  const isOnline = useSelector((store) => store.config.isOnline);
  if (isOnline) return;
  return (
    <div
      className="fixed z-50 left-1/2 top-12 px-4 py-2 bg-yellow-600 text-xs text-white font-bold flex gap-1 items-center"
      style={{ transform: `translateX(-50%)` }}
    >
      <img className="w-5 h-5" src={warningURL} alt="warning" />
      <span>You are not connected to the internet</span>
    </div>
  );
};

export default ImmediateOfflineDetection;
