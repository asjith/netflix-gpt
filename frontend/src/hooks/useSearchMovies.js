import { TMDB_SEARCH } from "../utils/constants";

const useSearchMovies = () => {
  const searchMovieTMDB = async (movie) => {
    try {
      const data = await fetch(TMDB_SEARCH + movie);

      if (!data.ok)
        throw new Error(
          `HTTP error: ${data.status} ${data.statusText} at ${
            data.url
          } (${new Date().toISOString()})`
        );

      const json = await data.json();

      const movieData = json.results.filter((item) => {
        if (item.title == movie) return item;
      });

      return movieData;
    } catch (error) {
      if (error.message.includes("HTTP error")) console.error(error.message);
      else console.error("Network error, ", error);
    }
  };

  return searchMovieTMDB;
};

export default useSearchMovies;
