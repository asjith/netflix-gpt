import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) return;

  const movie = movies[0];

  const { id, original_title, overview } = movie;

  return (
    <div>
      <VideoBackground movieId={id} />
      <VideoTitle movieId={id} title={original_title} overview={overview} />
    </div>
  );
};

export default MainContainer;
