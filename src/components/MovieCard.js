import {
  MOVIE_IMAGE_BASE_URL,
  MOVIE_CARD_IMAGE_SIZE,
} from "../utils/constants";

const MovieCard = (props) => {
  const { poster } = props;
  return (
    <div>
      <img src={MOVIE_IMAGE_BASE_URL + MOVIE_CARD_IMAGE_SIZE + poster} />
    </div>
  );
};

export default MovieCard;
