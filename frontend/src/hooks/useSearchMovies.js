import { TMDB_SEARCH } from "../utils/constants";

const useSearchMovies = () => {
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(TMDB_SEARCH + movie);
    const json = await data.json();

    const movieData = json.results.filter((item) => {
      if (item.title == movie) return item;
    });

    return movieData;
  };

  return searchMovieTMDB;
};

export default useSearchMovies;
