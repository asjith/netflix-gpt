import { useNavigate } from "react-router-dom";
import {
  MOVIE_IMAGE_BASE_URL,
  MOVIE_CARD_IMAGE_SIZE,
} from "../utils/constants";

const MovieCard = (props) => {
  const { visiblity, poster, calledFromGptSearch, movieId } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/browse/details?movieId=" + movieId);
  };

  return (
    <button
      className={
        calledFromGptSearch == "GptMovieSuggestions"
          ? "gpt-movies"
          : `movie ${visiblity ? "" : "not-visible"}`
      }
      onClick={handleClick}
    >
      <img
        className="rounded-md hover:rounded-lg"
        src={MOVIE_IMAGE_BASE_URL + MOVIE_CARD_IMAGE_SIZE + poster}
      />
    </button>
  );
};

export default MovieCard;
