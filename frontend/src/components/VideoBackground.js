import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import useMovieImage from "../hooks/useMovieImage";
import { useEffect, useState } from "react";
import {
  MOVIE_BACKGROUND_IMAGE_SIZE,
  MOVIE_IMAGE_BASE_URL,
} from "../utils/constants";

const VideoBackground = (props) => {
  const { movieId, backdropImage } = props;
  const [loadVideo, setLoadVideo] = useState(false);
  const movieTrailer = useSelector((store) => store.movies?.movieTrailer);
  const isOnline = useSelector((store) => store.config.isOnline);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadVideo(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useMovieTrailer(movieId);

  const movieBackgroundImage =
    MOVIE_IMAGE_BASE_URL + MOVIE_BACKGROUND_IMAGE_SIZE + backdropImage;

  return (
    <div>
      {isOnline && loadVideo ? (
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
      ) : (
        <img
          className="w-screen aspect-video object-cover"
          src={movieBackgroundImage}
          alt="movie-background"
        ></img>
      )}
    </div>
  );
};

export default VideoBackground;
