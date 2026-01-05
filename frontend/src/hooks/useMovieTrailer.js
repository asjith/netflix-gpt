import { useDispatch, useSelector } from "react-redux";
import { addMovieTrailer } from "../utils/moviesSlice";
import { useEffect } from "react";
import { TMDB_TRAILERS } from "../utils/constants";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const movieTrailer = useSelector((store) => store.movies.movieTrailer);

  const getMovieTrailer = async () => {
    try {
      const data = await fetch(TMDB_TRAILERS + movieId);

      if (!data.ok)
        throw new Error(
          `HTTP error: ${data.status} ${data.statusText} at ${
            data.url
          } (${new Date().toISOString()})`
        );

      const json = await data.json();

      //many elements inside json.resulta with different types like trialer, teaser, clip
      const filtertrailerData = json.results.filter(
        (video) => video?.type === "Trailer"
      );
      //if ther are no type trailer then take the first video details
      const trailer = filtertrailerData.length
        ? filtertrailerData[0]
        : json.results[0];

      dispatch(addMovieTrailer(trailer));
    } catch (error) {
      if (error.message.includes("HTTP error")) {
        console.error(error.message);
      } else {
        console.error(`Network error, `, error);
      }
    }
  };

  useEffect(() => {
    if (!movieTrailer) getMovieTrailer();
  }, []);
};

export default useMovieTrailer;
