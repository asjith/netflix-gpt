import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { TMDB_NOW_PLAYING } from "../utils/constants";
import { setFetchError } from "../utils/configSlice";

const useNowPlayingMovies = (retryCount) => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );
  const isOnline = useSelector((store) => store.config.isOnline);

  const getNowPlayingMovies = async () => {
    try {
      dispatch(setFetchError(false));
      const data = await fetch(TMDB_NOW_PLAYING);

      if (!data.ok)
        throw new Error(
          `HTTP error: ${data.status} ${data.statusText} at ${
            data.url
          } (${new Date().toISOString()})`
        );

      const json = await data.json();
      dispatch(addNowPlayingMovies(json.results));
    } catch (error) {
      if (error.message.includes("HTTP error")) {
        console.error(error.message);
      } else {
        console.error(`Network error, `, error);
      }
      dispatch(setFetchError(true));
    }
  };

  useEffect(() => {
    if (!navigator.onLine) return;
    if (!nowPlayingMovies) getNowPlayingMovies();
  }, [isOnline, retryCount]);
};

export default useNowPlayingMovies;
