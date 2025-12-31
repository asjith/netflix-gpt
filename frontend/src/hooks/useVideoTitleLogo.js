import { useDispatch, useSelector } from "react-redux";
import {
  MOVIE_API_OPTIONS,
  MOVIE_IMAGE_BASE_URL,
  MOVIE_LOGO_IMAGE_SIZE,
} from "../utils/constants";
import { addVideoTitleLogo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useVideoTitleLogo = (movieId) => {
  const dispatch = useDispatch();
  const videoTitleLogo = useSelector((store) => store.movies.videoTitleLogo);

  const getMovieLogo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieId + "/images",
      MOVIE_API_OPTIONS
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

    dispatch(addVideoTitleLogo(image));
  };

  useEffect(() => {
    if (!videoTitleLogo) getMovieLogo();
  }, []);
};

export default useVideoTitleLogo;
