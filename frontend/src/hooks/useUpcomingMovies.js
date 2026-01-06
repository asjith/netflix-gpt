import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies, addUpcomingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { TMDB_UPCOMING } from "../utils/constants";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);
  const isOnline = useSelector((store) => store.config.isOnline);

  const getUpcomingMovies = async () => {
    try {
      const data = await fetch(TMDB_UPCOMING);

      if (!data.ok)
        throw new Error(
          `HTTP error: ${data.status} ${data.statusText} at ${
            data.url
          } (${new Date().toISOString()})`
        );

      const json = await data.json();
      dispatch(addUpcomingMovies(json.results));
    } catch (error) {
      if (error.message.includes("HTTP error")) {
        console.error(error.message);
      } else {
        console.error("Network error, ", error);
      }
    }
  };

  useEffect(() => {
    if (!navigator.onLine) return;
    if (!upcomingMovies) getUpcomingMovies();
  }, [isOnline]);
};

export default useUpcomingMovies;
