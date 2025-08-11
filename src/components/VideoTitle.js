import { useSelector } from "react-redux";
import useVideoTitleLogo from "../hooks/useVideoTitleLogo";
import play from "../icons/play.png";
import info from "../icons/info.png";

const VideoTitle = (props) => {
  const { movieId, title, overview } = props;

  const movieLogo = useSelector((store) => store.movies?.videoTitleLogo);

  useVideoTitleLogo(movieId);

  return (
    <div className="absolute bottom-0 px-8 pt-52 bg-gradient-to-r from-black w-screen aspect-video">
      {movieLogo ? (
        <img src={movieLogo}></img>
      ) : (
        <h1 className="text-4xl font-bold my-2">{title}</h1>
      )}
      <p className="text-lg text-white my-2 w-1/2">{overview}</p>
      <div className="my-6">
        <button className="bg-white text-black py-2 px-6 rounded-md font-bold text-lg hover:bg-opacity-80">
          <img className="size-5 inline mr-2" src={play} />
          Play
        </button>
        <button className="bg-white text-white py-2 px-6 rounded-md font-bold text-lg bg-opacity-30 mx-2 hover:bg-opacity-15">
          <img className="size-6 inline mr-2" src={info}></img>
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
