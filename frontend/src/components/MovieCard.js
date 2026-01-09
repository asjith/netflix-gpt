import { useNavigate } from "react-router-dom";
import {
  MOVIE_IMAGE_BASE_URL,
  MOVIE_CARD_IMAGE_SIZE,
} from "../utils/constants";
import movieURL from "../icons/movie.png";

const MovieCard = (props) => {
  const { visiblity, poster, calledFromGptSearch, movieId, movieName } = props;
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
        alt={movieName}
        onError={(e) => (e.target.src = movieURL)}
        title={movieName}
      />
    </button>
  );
};

export default MovieCard;
