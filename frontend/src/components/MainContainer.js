import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import Loading from "./Loading";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const isOnline = useSelector((store) => store.config.isOnline);

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
