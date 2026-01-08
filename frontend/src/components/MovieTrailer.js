import React from "react";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useSelector } from "react-redux";
import NoResultsFound from "./NoResultsFound";

const MovieTrailer = ({ movieId, handleClick }) => {
  const forDetails = true;
  const movieTrailer = useSelector((store) => store.movies.currentMovieTrailer);
  const fetchError = useSelector((store) => store.config.fetchError);

  useMovieTrailer(movieId, forDetails);

  return (
    <div className="fixed top-0 left-0 right-0 botton-0 z-[60] h-full bg-black bg-opacity-50 text-white">
      {movieTrailer && (
        <iframe
          className="w-full h-full "
          src={
            "https://www.youtube.com/embed/" +
            movieTrailer?.key +
            "?playlist=" +
            movieTrailer?.key
          }
          title="YouTube video player"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      )}
      {fetchError && (
        <div className="fixed top-0 left-0 right-0 botton-0 z-[60] h-full bg-black">
          <NoResultsFound />
        </div>
      )}
      <button
        type="button"
        className="absolute top-0 right-0 z-[70] m-2 p-2 w-14 h-14 text-4xl font-bold bg-black rounded-full"
        onClick={handleClick}
      >
        &#10005;
      </button>
    </div>
  );
};

export default MovieTrailer;
