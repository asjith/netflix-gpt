import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies.nowPlayingMovies);
  if (!movies) return;
  console.log(movies);
  return (
    <div className="pl-8 my-8">
      <MovieList title="Now Playing" movies={movies} />
    </div>
  );
};

export default SecondaryContainer;
