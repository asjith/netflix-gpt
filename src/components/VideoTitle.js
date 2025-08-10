import { useSelector } from "react-redux";
import useVideoTitleLogo from "../hooks/useVideoTitleLogo";

const VideoTitle = (props) => {
  const { movieId, title, overview } = props;

  const movieLogo = useSelector((store) => store.movies?.videoTitleLogo);

  useVideoTitleLogo(movieId);

  return (
    <div className="w-1/2 px-8 pt-52">
      {movieLogo ? (
        <img src={movieLogo}></img>
      ) : (
        <h1 className="text-4xl font-bold my-2">{title}</h1>
      )}
      <p className="text-sm text-gray-600 my-2">{overview}</p>
      <div className="my-6">
        <button className="bg-gray-400 text-white py-2 px-4 rounded-md">
          ▶️ Play
        </button>
        <button className="bg-gray-400 text-white py-2 px-4 rounded-md mx-2">
          ℹ️ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
