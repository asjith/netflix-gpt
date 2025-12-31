import { MOVIE_API_OPTIONS } from "../utils/constants";

const useSearchMovies = () => {
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      MOVIE_API_OPTIONS
    );
    const json = await data.json();

    const movieData = json.results.filter((item) => {
      if (item.title == movie) return item;
    });

    return movieData;
  };

  return searchMovieTMDB;
};

export default useSearchMovies;
