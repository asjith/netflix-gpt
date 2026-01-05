import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsOnline } from "../utils/configSlice";

const useOnlineStatus = () => {
  const dispatch = useDispatch();

  const handleOnline = () => {
    dispatch(setIsOnline(true));
  };

  const handleOffline = () => {
    dispatch(setIsOnline(false));
  };

  useEffect(() => {
    if (!navigator.onLine) dispatch(setIsOnline(false));

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
};

export default useOnlineStatus;
