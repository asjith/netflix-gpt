import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const GptMovieSuggestions = () => {
  const gpt = useSelector((store) => store.gptSearch);

  const { movieNames, movieResults } = gpt;

  if (!movieResults) return;

  return (
    <div className="gpt-movie-container">
      {movieResults.map((perMovieResults) => {
        return perMovieResults.map((result) => {
          if (result.poster_path && result.popularity > 1) {
            return (
              <MovieCard
                key={result.id}
                visiblity={true}
                poster={result.poster_path}
                calledFromGptSearch="GptMovieSuggestions"
              />
            );
          }
        });
      })}
    </div>
  );
};

export default GptMovieSuggestions;
