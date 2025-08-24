import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies.nowPlayingMovies);
  if (!movies) return;

  return (
    <div className="">
      <MovieList title="Now Playing" movies={movies} />
    </div>
  );
};

export default SecondaryContainer;
