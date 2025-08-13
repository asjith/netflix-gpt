import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies.nowPlayingMovies);
  console.log(movies);
  return (
    <div>
      <MovieList title="Now Playing" movies={movies} />
    </div>
  );
};

export default SecondaryContainer;
