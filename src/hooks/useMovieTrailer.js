import { useDispatch, useSelector } from "react-redux";
import { MOVIE_API_OPTIONS } from "../utils/constants";
import { addMovieTrailer } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const movieTrailer = useSelector((store) => store.movies.movieTrailer);

  const getMovieTrailer = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      MOVIE_API_OPTIONS
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
  };

  useEffect(() => {
    if (!movieTrailer) getMovieTrailer();
  }, []);
};

export default useMovieTrailer;
