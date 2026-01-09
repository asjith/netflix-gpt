import React, { useState } from "react";
import {
  MOVIE_CARD_IMAGE_SIZE,
  MOVIE_IMAGE_BASE_URL,
} from "../utils/constants";
import MovieTrailer from "./MovieTrailer";
import playURL from "../icons/playTrailer.png";

const MovieContent = ({ movie }) => {
  const [openTrailer, setOpenTrailer] = useState(false);

  const handleClick = () => {
    setOpenTrailer(!openTrailer);
  };

  const duration =
    `${Math.floor(movie.runtime / 60)} h ` +
    (movie.runtime % 60 !== 0 && `${movie.runtime % 60} m`);

  const moviePoster =
    MOVIE_IMAGE_BASE_URL + MOVIE_CARD_IMAGE_SIZE + movie.poster_path;

  return (
    <div className="relative flex flex-col items-center gap-6 mx-[1rem] sm:mx-[3rem] sm:flex-row">
      <button
        type="button"
        className="trailer absolute -top-24 border-[15px] border-black rounded-md m-4"
        onClick={handleClick}
      >
        <img
          className="w-[12rem] h-[18rem]"
          src={moviePoster}
          alt={movie.title}
        />
        <img
          className="play absolute top-1/2 left-1/2 "
          src={playURL}
          alt="play-trailer"
        />
      </button>
      {openTrailer && (
        <MovieTrailer movieId={movie.id} handleClick={handleClick} />
      )}
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
