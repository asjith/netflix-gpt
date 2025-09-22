import language from "../utils/languageConstants";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  const languageName = useSelector((store) => store.config.language);

  return (
    <div className="p-[2%] bg-black rounded-lg text-xs sm:text-sm ">
      <form className="grid grid-cols-12 ">
        <input
          className="col-span-9 m-1 p-2 rounded-sm lg:col-span-10"
          placeholder={language?.[languageName]?.gptSearchPlaceholder}
        />
        <button className="col-span-3 m-1 p-2 border border-red-700 bg-red-700 font-semibold text-white rounded-sm w-fit lg:col-span-2">
          {language?.[languageName]?.search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
