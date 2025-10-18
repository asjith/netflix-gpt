import {
  MOVIE_IMAGE_BASE_URL,
  MOVIE_CARD_IMAGE_SIZE,
} from "../utils/constants";

const MovieCard = (props) => {
  const { visiblity, poster, calledFromGptSearch } = props;
  return (
    <img
      className={
        calledFromGptSearch == "GptMovieSuggestions"
          ? "gpt-movies"
          : `movie ${visiblity ? "" : "not-visible"}`
      }
      src={MOVIE_IMAGE_BASE_URL + MOVIE_CARD_IMAGE_SIZE + poster}
    />
  );
};

export default MovieCard;
