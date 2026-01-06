import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import { useSelector } from "react-redux";
import GptSearch from "./GptSearch";
import useOnlineStatus from "../hooks/useOnlineStatus";
import ImmediateOfflineDetection from "./ImmediateOfflineDetection";
import { useState } from "react";

const Browse = () => {
  const [retryCount, setRetryCount] = useState(0);
  const enableGptSearch = useSelector(
    (store) => store.gptSearch.enableGptSearch
  );

  const handleRetry = () => {
    setRetryCount((rc) => rc + 1);
  };

  useOnlineStatus();
  useNowPlayingMovies(retryCount);
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div>
      <Header />
      <ImmediateOfflineDetection />
      {enableGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer handleRetry={handleRetry} />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
