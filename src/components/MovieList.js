import { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";

const MovieList = (props) => {
  const { title, movies } = props;
  const [moviePerSlider, setMoviePerSlider] = useState(3);
  const [noOfMoviesMoved, setNoOfMoviesMoved] = useState(0); //no of movies already moved + to be moved
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
    // setSliderIndex(sliderIndex - 1);
  };

  const handleRightButton = () => {
    let nowMoviesMove = 0;

    nowMoviesMove = noOfMoviesMoved + moviePerSlider; // represents total movies to be moved now
    if (nowMoviesMove === movies.length) {
      //reached end
      nowMoviesMove = 0;
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
              console.log(noOfMoviesMoved);
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
          className="movie-slider"
          style={{
            "--transform": (noOfMoviesMoved * 100) / moviePerSlider,
          }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} poster={movie.poster_path} />
          ))}
        </div>
        <button className="handle right-handle" onClick={handleRightButton}>
          &#x203A;
        </button>
      </div>
    </div>
  );
};

export default MovieList;
