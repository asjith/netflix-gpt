import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = (props) => {
  const { movieId } = props;

  const movieTrailer = useSelector((store) => store.movies?.movieTrailer);

  useMovieTrailer(movieId);

  return (
    <div>
      <iframe
        className="w-auto aspect-video "
        src={
          "https://www.youtube.com/embed/" +
          movieTrailer?.key +
          "?&autoplay=1&mute=1&loop=1&playlist=" +
          movieTrailer?.key
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
