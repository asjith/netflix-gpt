import { LOGIN_BACKGROUND } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
  return (
    <div className="relative">
      <div className="absolute -z-10 w-[100rem]">
        <img
          className="brightness-50"
          src={LOGIN_BACKGROUND}
          alt="background"
        />
      </div>
      <div className="flex flex-col items-center">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </div>
  );
};

export default GptSearch;
