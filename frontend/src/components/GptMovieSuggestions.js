import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import React from "react";
import NoResultsFound from "./NoResultsFound";

const GptMovieSuggestions = () => {
  const gpt = useSelector((store) => store.gptSearch);

  const { movieNames, movieResults, notFound } = gpt;

  if (notFound) return <NoResultsFound />;

  if (!movieResults) return;

  return (
    <div className="gpt-whole-movie-container">
      {movieResults.map((perMovieResults, index) => {
        if (Object.keys(perMovieResults).length > 0)
          return (
            <React.Fragment key={movieNames[index]}>
              <MovieCard
                key={perMovieResults.id}
                visiblity={true}
                poster={perMovieResults.poster_path}
                calledFromGptSearch="GptMovieSuggestions"
              />
            </React.Fragment>
          );
      })}
    </div>
  );
};

export default GptMovieSuggestions;
