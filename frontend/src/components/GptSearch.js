import { useSelector } from "react-redux";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";
import ShimmerUi from "./ShimmerUi";
import backgroundURL from "../icons/background.jpg";

const GptSearch = () => {
  const clickedSearchButton = useSelector(
    (store) => store.gptSearch.clickedSearchButton
  );

  return (
    <div className="relative h-screen">
      <div className="absolute -z-10 h-full w-full">
        <img
          className="brightness-50 object-cover h-full w-full fixed"
          src={backgroundURL}
          alt="background"
        />
      </div>
      <div className="h-full">
        <div className="h-1/2 flex justify-center items-center">
          <GptSearchBar />
        </div>
        <div className="bg-black w-full bg-opacity-85">
          {clickedSearchButton ? <ShimmerUi /> : <GptMovieSuggestions />}
        </div>
      </div>
    </div>
  );
};

export default GptSearch;
