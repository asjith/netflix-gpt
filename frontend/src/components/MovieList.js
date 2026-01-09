import { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";

const TRANSITION_DELAY = 500;
const TRANSITION_RESET_DELAY = 100;
const PROGRESS_BAR_SEGMENTS = 3;

const MovieList = (props) => {
  const { title, movies } = props;

  const [moviePerSlider, setMoviePerSlider] = useState(3);
  const [noOfMoviesMoved, setNoOfMoviesMoved] = useState(3); //no of movies already moved to left
  const [hasTransition, setHasTransition] = useState(true);
  const [hasStartedMoving, setHasStartedMoving] = useState(false);

  const movieContainerInfo = useRef(null);
  const prevMoviePerSlider = useRef(moviePerSlider);

  const calcNoOfMoviesPerSlide = () => {
    //get value of variable --movie-per-slider used in css. This varies with screen size.
    if (movieContainerInfo.current) {
      const computedStyle = getComputedStyle(movieContainerInfo.current);
      const strToIntMoviePerSlide = parseInt(
        computedStyle.getPropertyValue("--movie-per-slider")
      );
      setMoviePerSlider(strToIntMoviePerSlide);
    }
  };

  useEffect(() => {
    //same function called during initial render and when screensize changes(resize event)
    calcNoOfMoviesPerSlide();
    window.addEventListener("resize", calcNoOfMoviesPerSlide);

    return () => window.removeEventListener("resize", calcNoOfMoviesPerSlide);
  }, []);

  //noOfMoviesMoved depends on moviePreSlider, so set each time it changes
  useEffect(() => {
    if (prevMoviePerSlider.current !== moviePerSlider) {
      const prevValue = prevMoviePerSlider.current;
      setNoOfMoviesMoved((prev) => prev - prevValue + moviePerSlider);
    }
    prevMoviePerSlider.current = moviePerSlider;
  }, [moviePerSlider]);

  const resetToPosition = (moviesMoved) => {
    setTimeout(() => {
      setHasTransition(false); //set transition to none, so movement is not shown
      setNoOfMoviesMoved(moviesMoved); //go to end if left button clicked or start if right button
      setTimeout(() => setHasTransition(true), TRANSITION_RESET_DELAY); //enable transition, after 100 ms for future
    }, TRANSITION_DELAY);
  };

  const handleLeftButton = (e) => {
    let nowMoviesMove = 0;

    nowMoviesMove = noOfMoviesMoved - moviePerSlider; // represents total movies to be on left side of the screen
    if (nowMoviesMove === 0) {
      //reached start, so go to clone part
      setNoOfMoviesMoved(nowMoviesMove); //shows left side clone part
      resetToPosition(movies.length);
    } else if (nowMoviesMove < moviePerSlider) {
      //almost at the end yet not reached, there are remaining movies on left side, which are not equal to no of movies per slide, so adjust
      nowMoviesMove = moviePerSlider;
      setNoOfMoviesMoved(nowMoviesMove);
    } else {
      setNoOfMoviesMoved(nowMoviesMove);
    }
  };

  const handleRightButton = () => {
    let nowMoviesMove = 0;

    if (hasStartedMoving === false) setHasStartedMoving(true); //indicate first click on movement button

    nowMoviesMove = noOfMoviesMoved + moviePerSlider; // represents total movies to be moved now
    if (noOfMoviesMoved === movies.length) {
      //reached end, so go to clone part
      setNoOfMoviesMoved(nowMoviesMove); //show right side clown part
      resetToPosition(moviePerSlider);
    } else if (nowMoviesMove > movies.length) {
      //there are remaining movies on right, which are not equal to no of movies per slide, so adjust
      nowMoviesMove = movies.length;
      setNoOfMoviesMoved(nowMoviesMove);
    } else {
      setNoOfMoviesMoved(nowMoviesMove);
    }
  };

  const getProgressBar = () => {
    return Array(PROGRESS_BAR_SEGMENTS)
      .fill()
      .map((_, i) => {
        if (
          (i === 0 && noOfMoviesMoved === moviePerSlider) ||
          (i === 2 && noOfMoviesMoved === movies.length) ||
          (i === 1 &&
            noOfMoviesMoved > moviePerSlider &&
            noOfMoviesMoved < movies.length)
        )
          return (
            <div
              key={i}
              className="progress"
              style={{
                backgroundColor: "white",
                transition: "background-color 1000ms ease-in",
              }}
            ></div>
          );
        else return <div key={i} className="progress"></div>;
      });
  };

  return (
    <div className="pt-[2%] pb-[2%]">
      <div className="movie-list-header py-1">
        <h1 className="title font-bold text-white text-xs sm:text-sm md:text-lg lg:text-xl">
          {title}
        </h1>
        <div className="progress-bar">{getProgressBar()}</div>
      </div>
      <div className="movie-container" ref={movieContainerInfo}>
        {hasStartedMoving ? (
          <button className="handle left-handle" onClick={handleLeftButton}>
            &#x2039;
          </button>
        ) : (
          <div className="movie-list-start-margin"></div>
        )}
        <div
          className={`movie-slider ${
            hasTransition ? "do-transition" : "no-transition"
          }`}
          style={{
            "--transform": (noOfMoviesMoved * 100) / moviePerSlider,
          }}
        >
          {
            //cloning
            movies
              .slice(movies.length - moviePerSlider, movies.length)
              .map((movie) => (
                <MovieCard
                  key={`clone-${movie.id}`}
                  visiblity={hasStartedMoving ? true : false}
                  poster={movie.poster_path}
                  movieName={movie.title}
                />
              ))
          }
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movieId={movie.id}
              visiblity={true}
              poster={movie.poster_path}
              movieName={movie.title}
            />
          ))}
          {
            //cloning
            movies.slice(0, moviePerSlider).map((movie) => (
              <MovieCard
                key={`clone-${movie.id}`}
                visiblity={true}
                poster={movie.poster_path}
                movieName={movie.title}
              />
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
