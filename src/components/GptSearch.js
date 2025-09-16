import { LOGIN_BACKGROUND } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute -z-10 h-full w-full">
        <img
          className="brightness-50 object-cover h-full w-full"
          src={LOGIN_BACKGROUND}
          alt="background"
        />
      </div>
      <div className="flex flex-col items-center justify-evenly h-full">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </div>
  );
};

export default GptSearch;
