import { useRef } from "react";
import language from "../utils/languageConstants";
import { useSelector } from "react-redux";
import openai from "../utils/openai";

const GptSearchBar = () => {
  const searchText = useRef();
  const languageName = useSelector((store) => store.config.language);

  const handleGptSearchClick = async () => {
    const response = await openai.responses.create({
      model: "gpt-5-mini",
      instructions: "Act like movie recommendation system",
      input:
        "Suggest movies for query " +
        searchText.current.value +
        ". Recommend exactly 5 movies seperated by comma. Example: Avesham, War, Dhoom, Falimy, Notebook",
    });
    console.log(response.output_text);
  };

  return (
    <div className="p-[2%] bg-black rounded-lg text-xs sm:text-sm ">
      <form className="grid grid-cols-12 " onSubmit={(e) => e.preventDefault()}>
        <input
          className="col-span-9 m-1 p-2 rounded-sm lg:col-span-10"
          placeholder={language?.[languageName]?.gptSearchPlaceholder}
          ref={searchText}
        />
        <button
          className="col-span-3 m-1 p-2 border border-red-700 bg-red-700 font-semibold text-white rounded-sm w-fit lg:col-span-2"
          onClick={handleGptSearchClick}
        >
          {language?.[languageName]?.search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
