import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies.nowPlayingMovies);
  if (!movies) return;

  return (
    <div className="bg-black">
      <div className=" relative -mt-[15%]">
        <MovieList title="Now Playing" movies={movies} />
        <MovieList title="Now Playing" movies={movies} />
        <MovieList title="Now Playing" movies={movies} />
        <MovieList title="Now Playing" movies={movies} />
        <MovieList title="Now Playing" movies={movies} />
        <MovieList title="Now Playing" movies={movies} />
        <MovieList title="Now Playing" movies={movies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
