import MovieCard from "./MovieCard";

const MovieList = (props) => {
  const { title, movies } = props;

  return (
    <div>
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex gap-2 overflow-x-scroll scrollbar-hidden my-2">
        {movies.map((movie) => (
          <MovieCard key={movie.id} poster={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
