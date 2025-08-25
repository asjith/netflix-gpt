import {
  MOVIE_IMAGE_BASE_URL,
  MOVIE_CARD_IMAGE_SIZE,
} from "../utils/constants";

const MovieCard = (props) => {
  const { visiblity, poster } = props;
  return (
    <img
      className={`movie ${visiblity ? "" : "not-visible"}`}
      src={MOVIE_IMAGE_BASE_URL + MOVIE_CARD_IMAGE_SIZE + poster}
    />
  );
};

export default MovieCard;
