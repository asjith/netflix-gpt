import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const GptMovieSuggestions = () => {
  const gpt = useSelector((store) => store.gptSearch);

  const { movieNames, movieResults } = gpt;

  if (!movieResults) return;

  return (
    <div className="gpt-whole-movie-container">
      {movieResults.map((perMovieResults, index) => {
        return (
          <>
            {perMovieResults.length > 0 && (
              <div className="my-4">
                <h1 className="text-white font-bold text-xl py-2">
                  {movieNames[index]}
                </h1>
                <div className="gpt-movie-container">
                  {perMovieResults.map((result) => {
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
                  })}
                </div>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default GptMovieSuggestions;
