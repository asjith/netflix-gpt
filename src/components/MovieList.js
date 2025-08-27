import { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";

const MovieList = (props) => {
  const { title, movies } = props;
  const [moviePerSlider, setMoviePerSlider] = useState(3);
  const [noOfMoviesMoved, setNoOfMoviesMoved] = useState(3); //no of movies already moved to left
  const [transitionRequired, setTransitionRequired] = useState(true);
  const [startToMove, setStartToMove] = useState(false);
  const movieContainerInfo = useRef(null);
  const prevMoviePerSlider = useRef(moviePerSlider);

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

  //noOfMoviesMoved depends on moviePreSlider, so set each time it changes
  useEffect(() => {
    if (prevMoviePerSlider.current !== moviePerSlider) {
      const prevValue = prevMoviePerSlider.current;
      setNoOfMoviesMoved((prev) => prev - prevValue + moviePerSlider);
    }
    prevMoviePerSlider.current = moviePerSlider;
  }, [moviePerSlider]);

  const handleLeftButton = (e) => {
    let nowMoviesMove = 0;

    nowMoviesMove = noOfMoviesMoved - moviePerSlider; // represents total movies to be on left side of the screen
    if (nowMoviesMove === 0) {
      //reached start, so go to clone part
      setNoOfMoviesMoved(nowMoviesMove); //shows left side clone part
      setTimeout(() => {
        setTransitionRequired(false); //set transition to none, so movement towards right to go all the way back to end of the actual movie list, is not shown
        setNoOfMoviesMoved(movies.length); //go to end
        setTimeout(() => setTransitionRequired(true), 100); //enable transition, after 100 ms for future
      }, 500);
      return;
    } else if (nowMoviesMove < moviePerSlider) {
      //almost at the end yet not reached, there are remaining movies on left side, which are not equal to no of movies per slide, so adjust
      nowMoviesMove = moviePerSlider;
    }

    setNoOfMoviesMoved(nowMoviesMove);
  };

  const handleRightButton = () => {
    let nowMoviesMove = 0;

    if (startToMove === false) setStartToMove(true); //indicate first click on movement button

    nowMoviesMove = noOfMoviesMoved + moviePerSlider; // represents total movies to be moved now
    if (noOfMoviesMoved === movies.length) {
      //reached end, so go to clone part
      setNoOfMoviesMoved(nowMoviesMove); //show right side clown part
      setTimeout(() => {
        setTransitionRequired(false); //set transition to none, so movement towards left to go all the way back to starting of the movie list, is not shown
        setNoOfMoviesMoved(moviePerSlider); //go to start
        setTimeout(() => setTransitionRequired(true), 100); //enable transition, after 100 ms for future
      }, 500);
      return;
    } else if (nowMoviesMove > movies.length) {
      //there are remaining movies on right, which are not equal to no of movies per slide, so adjust
      nowMoviesMove = movies.length;
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
        {startToMove ? (
          <button className="handle left-handle" onClick={handleLeftButton}>
            &#x2039;
          </button>
        ) : (
          <div className="movie-list-start-margin"></div>
        )}
        <div
          className={`movie-slider ${
            transitionRequired ? "do-transition" : "no-transition"
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
                  visiblity={startToMove ? true : false}
                  poster={movie.poster_path}
                />
              ))
          }
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              visiblity={true}
              poster={movie.poster_path}
            />
          ))}
          {
            //cloning
            movies.slice(0, moviePerSlider).map((movie) => (
              <MovieCard
                key={`clone-${movie.id}`}
                visiblity={true}
                poster={movie.poster_path}
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
