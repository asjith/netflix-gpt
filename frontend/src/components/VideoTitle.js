import { useSelector } from "react-redux";
import useVideoTitleLogo from "../hooks/useVideoTitleLogo";
import play from "../icons/play.png";
import info from "../icons/info.png";
import useBreakpoints from "../hooks/useBreakpoints";

const VideoTitle = (props) => {
  const { movieId, title, overview } = props;

  const movieLogo = useSelector((store) => store.movies?.mainVideoTitleLogo);

  useVideoTitleLogo(movieId);
  const { isDesktop } = useBreakpoints();

  return (
    <div className="absolute bottom-0 px-[1rem] pt-[20%] bg-gradient-to-r from-black  aspect-video h-full lg:pt-52 sm:px-[3rem]">
      <div className="w-[15%]">
        <img src={movieLogo}></img>
      </div>

      {isDesktop && <p className="text-sm text-white my-2 w-1/2">{overview}</p>}
      <div className=" flex flex-grow-0 my-[2%] ">
        <button className="px-2 py-[0.1rem] bg-white text-black  rounded-md font-bold text-[0.5rem] sm:py-1 sm:px-4 sm:text-sm lg:text-lg hover:bg-opacity-80">
          <div className="flex items-center shrink-0">
            <img className="size-[0.5rem] mr-2 lg:size-5" src={play} />
            <p>Play</p>
          </div>
        </button>
        <button className="px-2 py-[0.1rem] bg-white text-white rounded-md font-bold text-[0.5rem] sm:py-1 sm:px-4 sm:text-sm lg:text-lg bg-opacity-30 mx-2 hover:bg-opacity-15">
          <div className="flex items-center shrink-0">
            <img className="size-[0.5rem] mr-2 lg:size-6" src={info}></img>
            <p>More Info</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
