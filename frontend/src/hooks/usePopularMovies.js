import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { TMDB_POPULAR } from "../utils/constants";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const isOnline = useSelector((store) => store.config.isOnline);

  const getPopularMovies = async () => {
    try {
      const data = await fetch(TMDB_POPULAR);

      if (!data.ok)
        throw new Error(
          `HTTP error: ${data.status} ${data.statusText} at ${
            data.url
          } (${new Date().toISOString()})`
        );

      const json = await data.json();
      dispatch(addPopularMovies(json.results));
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
    if (!popularMovies) getPopularMovies();
  }, [isOnline]);
};

export default usePopularMovies;
