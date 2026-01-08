import { useDispatch, useSelector } from "react-redux";
import {
  TMDB_MOVIE_LOGO,
  MOVIE_IMAGE_BASE_URL,
  MOVIE_LOGO_IMAGE_SIZE,
} from "../utils/constants";
import { addMainVideoTitleLogo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useVideoTitleLogo = (movieId) => {
  const dispatch = useDispatch();
  const videoTitleLogo = useSelector(
    (store) => store.movies.mainVideoTitleLogo
  );

  const getMovieLogo = async () => {
    try {
      const data = await fetch(TMDB_MOVIE_LOGO + movieId);

      if (!data.ok)
        throw new Error(
          `HTTP error: ${data.status} ${data.statusText} at ${
            data.url
          } (${new Date().toISOString()})`
        );

      const json = await data.json();

      //filtering english logo
      const englishLogoFilePaths = json?.logos.filter(
        (logo) => logo.iso_639_1 === "en"
      );
      const image =
        MOVIE_IMAGE_BASE_URL +
        MOVIE_LOGO_IMAGE_SIZE +
        englishLogoFilePaths[0]?.file_path;

      dispatch(addMainVideoTitleLogo(image));
    } catch (error) {
      //http error
      if (error.message.includes("HTTP error")) {
        console.error(error.message);
      } else {
        console.error("Network error: ", error);
      }
    }
  };

  useEffect(() => {
    if (!videoTitleLogo) getMovieLogo();
  }, []);
};

export default useVideoTitleLogo;
