import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { TMDB_TOP_RATED } from "../utils/constants";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);
  const isOnline = useSelector((store) => store.config.isOnline);

  const getTopRatedMovies = async () => {
    try {
      const data = await fetch(TMDB_TOP_RATED);

      if (!data.ok)
        throw new Error(
          `HTTP error: ${data.status} ${data.statusText} at ${
            data.url
          } (${new Date().toISOString()})`
        );

      const json = await data.json();
      dispatch(addTopRatedMovies(json.results));
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
    if (!topRatedMovies) getTopRatedMovies();
  }, [isOnline]);
};

export default useTopRatedMovies;
