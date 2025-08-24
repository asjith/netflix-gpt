import { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";

const MovieList = (props) => {
  const { title, movies } = props;
  const [moviePerSlider, setMoviePerSlider] = useState(3);
  const [noOfMoviesMoved, setNoOfMoviesMoved] = useState(0); //no of movies already moved + to be moved
  const [transitionRequired, setTransitionRequired] = useState(true);
  const movieContainerInfo = useRef(null);

  const calcNoOfMoviesPerSlide = () => {
    //get value of variable --movie-per-slider used in css. This varies with screen size.
    const computedStyle = getComputedStyle(movieContainerInfo.current);
    const strToIntMoviePerSlide = parseInt(
      computedStyle.getPropertyValue("--movie-per-slider")
    );
    setMoviePerSlider(strToIntMoviePerSlide);
  };

  useEffect(() => {
    //same function called during initial render and when screensize changes(resize event)
    calcNoOfMoviesPerSlide();
    window.addEventListener("resize", calcNoOfMoviesPerSlide);

    return () => window.removeEventListener("resize", calcNoOfMoviesPerSlide);
  }, []);

  const handleLeftButton = (e) => {
    let nowMoviesMove = 0;

    nowMoviesMove = noOfMoviesMoved - moviePerSlider; // represents total movies to be on left side of the screen
    if (nowMoviesMove === -moviePerSlider) {
      //reached start, so go to end
      nowMoviesMove = movies.length - moviePerSlider;
    } else if (nowMoviesMove < 0) {
      //there are movies left on left side of screen, which are not equal to no of movies per slide, so set to start
      nowMoviesMove = 0;
    }
    setNoOfMoviesMoved(nowMoviesMove);
  };

  const handleRightButton = () => {
    let nowMoviesMove = 0;

    nowMoviesMove = noOfMoviesMoved + moviePerSlider; // represents total movies to be moved now
    if (nowMoviesMove === movies.length) {
      //reached end, so go to clone part
      setNoOfMoviesMoved(nowMoviesMove);
      setTimeout(() => {
        setTransitionRequired(false); //set transition to none, so movement towards left to go all the way back to starting is not shown
        setNoOfMoviesMoved(0); //go to start
        setTimeout(() => setTransitionRequired(true), 100); //enable transition, after 100 ms for future
      }, 700);
      return;
    } else if (nowMoviesMove + moviePerSlider > movies.length) {
      //there are movies left on right, which are not equal to no of movies per slide, so adjust
      nowMoviesMove = noOfMoviesMoved + (movies.length - nowMoviesMove);
    }
    setNoOfMoviesMoved(nowMoviesMove);
  };

  return (
    <div>
      <div className="movie-list-header">
        <h1 className="title text-xl font-bold">{title}</h1>
        <div className="progress-bar">
          {Array(3)
            .fill()
            .map((_, i) => {
              if (
                (i === 0 && noOfMoviesMoved === 0) ||
                (i === 2 &&
                  noOfMoviesMoved + moviePerSlider >= movies.length) ||
                (i === 1 &&
                  noOfMoviesMoved + moviePerSlider < movies.length &&
                  noOfMoviesMoved !== 0)
              )
                return (
                  <div
                    key={i}
                    className="progress"
                    style={{
                      backgroundColor: "black",
                      transition: "background-color 1000ms ease-in",
                    }}
                  ></div>
                );
              else return <div key={i} className="progress"></div>;
            })}
        </div>
      </div>
      <div className="movie-container" ref={movieContainerInfo}>
        <button className="handle left-handle" onClick={handleLeftButton}>
          &#x2039;
        </button>
        <div
          className={`movie-slider ${
            transitionRequired ? "do-transition" : "no-transition"
          }`}
          style={{
            "--transform": (noOfMoviesMoved * 100) / moviePerSlider,
          }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} poster={movie.poster_path} />
          ))}
          {
            //cloning
            movies.slice(0, moviePerSlider).map((movie) => (
              <MovieCard key={`clone-${movie.id}`} poster={movie.poster_path} />
            ))
          }
        </div>
        <button className="handle right-handle" onClick={handleRightButton}>
          &#x203A;
        </button>
      </div>
    </div>
  );
};

export default MovieList;
