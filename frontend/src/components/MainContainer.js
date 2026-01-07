import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import Loading from "./Loading";
import Error from "./Error";
import { useState } from "react";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";

const MainContainer = () => {
  const [retryCount, setRetryCount] = useState(0);
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const isOnline = useSelector((store) => store.config.isOnline);
  const fetchError = useSelector((store) => store.config.fetchError);

  const handleRetry = () => {
    setRetryCount((rc) => rc + 1);
  };

  useNowPlayingMovies(retryCount);
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  if (fetchError) return <Error handleRetry={handleRetry} />;

  if (!movies) {
    if (isOnline) return <Loading />;
    else return;
  }

  const movie = movies[0];

  const { id, original_title, overview } = movie;

  return (
    <div className="relative">
      <VideoBackground movieId={id} />
      <VideoTitle movieId={id} title={original_title} overview={overview} />
    </div>
  );
};

export default MainContainer;
