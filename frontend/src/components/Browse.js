import Header from "./Header";
import useOnlineStatus from "../hooks/useOnlineStatus";
import ImmediateOfflineDetection from "./ImmediateOfflineDetection";
import { Outlet } from "react-router-dom";

const Browse = () => {
  useOnlineStatus();
  return (
    <div>
      <Header />
      <ImmediateOfflineDetection />
      <Outlet />
    </div>
  );
};

export default Browse;
