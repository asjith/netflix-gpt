import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  MOVIE_BACKGROUND_IMAGE_SIZE,
  MOVIE_IMAGE_BASE_URL,
  TMDB_MOVIE_DETAILS,
} from "../utils/constants";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import NoResultsFound from "./NoResultsFound";
import Error from "./Error";
import MovieContent from "./MovieContent";
import CastList from "./CastList";

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [searchParams] = useSearchParams();
  const isOnline = useSelector((store) => store.config.isOnline);

  useEffect(() => {
    if (!navigator.onLine) return;
    fetchMovieDetails();
  }, [isOnline, retryCount]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      setNotFound(false);
      setError(false);

      const movieId = searchParams.get("movieId");
      const data = await fetch(TMDB_MOVIE_DETAILS + movieId);

      if (!data.ok)
        throw new Error(
          `HTTP error: ${data.status} ${data.statusText} at ${
            data.url
          } (${new Date().toISOString()})`
        );

      const json = await data.json();

      setMovieDetails(json);
    } catch (error) {
      if (error.message.includes("HTTP error")) {
        console.error(error.message);
        if (error.message.includes("404")) setNotFound(true);
        else setError(true);
      } else {
        console.error("Network error, ", error);
        setError(true);
      }
    }
    setLoading(false);
  };

  const handleRetry = () => {
    setRetryCount((rc) => rc + 1);
  };

  if (loading) return <Loading />;

  if (notFound) return <NoResultsFound />;

  if (error) return <Error handleRetry={handleRetry} />;

  if (!movieDetails) return;

  const backgroundImage =
    MOVIE_IMAGE_BASE_URL +
    MOVIE_BACKGROUND_IMAGE_SIZE +
    movieDetails?.backdrop_path;

  return (
    <div className="bg-black text-white">
      <div
        className="h-96"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <MovieContent movie={movieDetails} />
      <CastList movieId={movieDetails.id} />
    </div>
  );
};

export default MovieDetails;
