import React from "react";
import {
  MOVIE_CARD_IMAGE_SIZE,
  MOVIE_IMAGE_BASE_URL,
} from "../utils/constants";

const MovieContent = ({ movie }) => {
  const duration =
    `${Math.floor(movie.runtime / 60)} h ` +
    (movie.runtime % 60 !== 0 && `${movie.runtime % 60} m`);

  const moviePoster =
    MOVIE_IMAGE_BASE_URL + MOVIE_CARD_IMAGE_SIZE + movie.poster_path;

  return (
    <div className="relative flex flex-col items-center gap-6 mx-[1rem] sm:mx-[3rem] sm:flex-row">
      <img
        className="absolute -top-24 w-30 h-80 border-[15px] border-black rounded-md m-4 "
        src={moviePoster}
        alt={movie.title}
      />
      <div className="flex flex-col gap-6 m-4 mt-72 sm:ml-72 sm:my-10">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-4xl">{movie.title}</h1>
          {movie.tagline && (
            <p className="text-xs text-gray-500">{movie.tagline}</p>
          )}
        </div>
        <div className="flex gap-4 flex-wrap">
          <span>⭐ {movie.vote_average}</span>
          <span>📆 {movie.release_date}</span>
          <span>🕑 {duration}</span>
        </div>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieContent;
