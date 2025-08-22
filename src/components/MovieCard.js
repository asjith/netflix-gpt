import {
  MOVIE_IMAGE_BASE_URL,
  MOVIE_CARD_IMAGE_SIZE,
} from "../utils/constants";

const MovieCard = (props) => {
  const { poster } = props;
  return (
    <img
      className="movie"
      src={MOVIE_IMAGE_BASE_URL + MOVIE_CARD_IMAGE_SIZE + poster}
    />
  );
};

export default MovieCard;
