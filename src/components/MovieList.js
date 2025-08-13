import MovieCard from "./MovieCard";

const MovieList = (props) => {
  const { title, movies } = props;

  return (
    <div>
      <h1>{title}</h1>
      {movies.map((movie) => (
        <MovieCard key={movie.id} poster={movie.backdrop_path} />
      ))}
    </div>
  );
};

export default MovieList;
