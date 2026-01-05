import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMovieBackgroundImage } from "../utils/moviesSlice";
import {
  MOVIE_BACKGROUND_IMAGE_SIZE,
  MOVIE_IMAGE_BASE_URL,
  TMDB_MOVIE_IMAGE,
} from "../utils/constants";

const useMovieImage = (movieId) => {
  const dispatch = useDispatch();
  const movieBackgroundImage = useSelector(
    (store) => store.movies.movieBackgroundImage
  );

  const getMovieImage = async () => {
    try {
      const data = await fetch(TMDB_MOVIE_IMAGE + movieId);
      if (!data.ok)
        throw new Error(
          `HTTP error: ${data.status} ${data.statusText} at ${
            data.url
          } (${new Date().toDateString()})`
        );

      const json = await data.json();

      const backdrops = json.backdrops.filter(
        (image) => image.iso_639_1 === null
      );

      const image =
        MOVIE_IMAGE_BASE_URL +
        MOVIE_BACKGROUND_IMAGE_SIZE +
        backdrops[0].file_path;

      dispatch(addMovieBackgroundImage(image));
    } catch (error) {
      if (error.message.includes("HTTP error")) {
        console.error(error.message);
      } else {
        console.error("Network error, ", error);
      }
    }
  };

  useEffect(() => {
    if (!movieBackgroundImage) getMovieImage();
  }, []);
};

export default useMovieImage;
