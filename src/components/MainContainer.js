import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) return;

  const movie = movies[0];
  console.log(movie);
  const { original_title, overview } = movie;

  return (
    <div>
      <VideoBackground />
      <VideoTitle title={original_title} overview={overview} />
    </div>
  );
};

export default MainContainer;
