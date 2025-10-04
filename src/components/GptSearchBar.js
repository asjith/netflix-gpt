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
      instructions:
        "Act like movie recommendation system. You have access to up-to-date movie knowledge across all languages, including Indian cinema (Malayalam, Tamil, Telugu, Hindi, etc.), Hollywood, and global films.",
      input:
        "Suggest movies for query " +
        searchText.current.value +
        ". Recommend exactly 10 movies seperated by comma. Example: Avesham, War, Dhoom, Falimy, Notebook." +
        "If a person's name spotted in the query, then give results of movies he or she has appeared on." +
        "Like 'basil joseph movies', then display movies where basil joseph has acted on." +
        "if mentioned basil joseph directed movies, then display movies directed by him." +
        "if you identify a person as a director only, then display movies that he has directed." +
        "Always fetch latest, recent movies unless mentioned old, retro." +
        "Always display movies list. Never ask any question as response. Trust your intuition." +
        "To summarise:" +
        "You are a movie recommendation system. Always output exactly 10 movie titles separated by commas — nothing else." +
        "Rules:" +
        "1. The user will enter a text query describing what kind of movies they want (e.g., 'Indian retro movies', 'Basil Joseph movies', 'romantic Malayalam films', etc.)." +
        "2. If the query includes a person's name:" +
        "- If the query mentions 'directed' or 'director', return movies that the person has directed." +
        "- Otherwise, return movies the person has acted in or appeared in (even cameo roles)." +
        "- If fewer than 10 movies are available, fill the remaining slots with movies similar in genre, language, or style." +
        "3. If the query includes both a person and a genre, prioritize that combination (e.g., 'Nivin Pauly action movies' → Nivin Pauly’s action movies)." +
        "4. If no person is mentioned, treat the query as a general movie search based on genre, language, theme, or time period." +
        "5. Always prefer recent and popular titles from the last few years unless the query explicitly mentions 'old', 'classic', or 'retro'." +
        "6. Never ask questions or seek clarification. Never include explanations or text outside the movie list." +
        "7. The final output must be **only** a list of 10 movie titles separated by commas, e.g.:Aavesham, War, Dhoom, Falimy, Notebook, ...",
    });

    const gptMovies = response?.output_text?.split(", ");

    if (!gptMovies || gptMovies.length < 4) {
      console.log("sorry, could not find.", response.output_text);
    } else {
      console.log(gptMovies);
    }
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
