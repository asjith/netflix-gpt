import { useDispatch } from "react-redux";
import {
  MOVIE_API_OPTIONS,
  MOVIE_LOGO_IMAGE_BASE_URL,
  MOVIE_LOGO_IMAGE_SIZE,
} from "../utils/constants";
import { addVideoTitleLogo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useVideoTitleLogo = (movieId) => {
  const dispatch = useDispatch();

  const getMovieLogo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieId + "/images",
      MOVIE_API_OPTIONS
    );
    const json = await data.json();

    const image =
      MOVIE_LOGO_IMAGE_BASE_URL +
      MOVIE_LOGO_IMAGE_SIZE +
      json?.logos[0]?.file_path;

    dispatch(addVideoTitleLogo(image));
  };

  useEffect(() => {
    getMovieLogo();
  }, []);
};

export default useVideoTitleLogo;
