import { useRef } from "react";
import language from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import useSearchMovies from "../hooks/useSearchMovies";
import {
  addMovies,
  setNotFound,
  toggleClickedSearchButton,
} from "../utils/gptSearchSlice";

const GptSearchBar = () => {
  const searchText = useRef();
  const languageName = useSelector((store) => store.config.language);
  const searchMovieTMDB = useSearchMovies();
  const dispatch = useDispatch();

  const handleGptSearchClick = async () => {
    try {
      dispatch(toggleClickedSearchButton(1));
      dispatch(addMovies({ movieNames: null, movieResults: null }));
      dispatch(setNotFound(false));

      const response = await openai.responses.create({
        model: "gpt-5-mini",
        instructions:
          "Act like movie recommendation system. You have access to up-to-date movie knowledge across all languages, including Indian cinema (Malayalam, Tamil, Telugu, Hindi, etc.), Hollywood, and global films.",
        input:
          "Suggest movies for query " +
          searchText.current.value +
          ". Recommend exactly 5 movies seperated by comma. Example: Avesham, War, Dhoom, Falimy, Notebook." +
          "If a person's name spotted in the query, then give results of movies he or she has appeared on." +
          "Like 'basil joseph movies', then display movies where basil joseph has acted on." +
          "if mentioned basil joseph directed movies, then display movies directed by him." +
          "if you identify a person as a director only, then display movies that he has directed." +
          "Always fetch latest, recent movies unless mentioned old, retro." +
          "Always display movies list. Never ask any question as response. Trust your intuition." +
          "To summarise:" +
          "You are a movie recommendation system. Always output exactly 5 movie titles separated by commas — nothing else." +
          "Rules:" +
          "1. The user will enter a text query describing what kind of movies they want (e.g., 'Indian retro movies', 'Basil Joseph movies', 'romantic Malayalam films', etc.)." +
          "2. If the query includes a person's name:" +
          "- If the query mentions 'directed' or 'director', return movies that the person has directed." +
          "- Otherwise, return movies the person has acted in or appeared in (even cameo roles)." +
          "- If fewer than 5 movies are available, fill the remaining slots with movies similar in genre, language, or style." +
          "3. If the query includes both a person and a genre, prioritize that combination (e.g., 'Nivin Pauly action movies' → Nivin Pauly’s action movies)." +
          "4. If no person is mentioned, treat the query as a general movie search based on genre, language, theme, or time period." +
          "5. Always prefer recent and popular titles from the last few years unless the query explicitly mentions 'old', 'classic', or 'retro'." +
          "6. Never ask questions or seek clarification. Never include explanations or text outside the movie list." +
          "7. The final output must be **only** a list of 5 movie titles separated by commas, e.g.:Aavesham, War, Dhoom, Falimy, Notebook, ...",
      });

      const gptMovieNames = response?.output_text?.split(", ");

      if (!gptMovieNames || gptMovieNames.length <= 3) {
        console.error("Sorry, could not find.", response.output_text);
        dispatch(setNotFound(true));
      } else {
        const moviePromiseArray = gptMovieNames.map((movie) =>
          searchMovieTMDB(movie)
        );
        const gptMoviesResults = await Promise.all(moviePromiseArray);

        const moviesResult = gptMoviesResults.map((movie) => {
          let filteredResult = movie.filter((result) => {
            if (result.poster_path && result.vote_average > 5) return true;
          });

          if (filteredResult.length === 0 && movie.length > 0)
            filteredResult = movie[0];
          else if (filteredResult.length >= 1)
            filteredResult = filteredResult[0];
          else {
            filteredResult = {};
          }

          return filteredResult;
        });

        if (moviesResult.length) {
          dispatch(
            addMovies({
              movieNames: gptMovieNames,
              movieResults: moviesResult,
            })
          );
        } else {
          dispatch(setNotFound(true));
        }
      }
      dispatch(toggleClickedSearchButton(0));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-[2%] bg-black rounded-lg text-xs sm:text-sm ">
      <form className="grid grid-cols-12 " onSubmit={(e) => e.preventDefault()}>
        <input
          className="col-span-9 m-1 p-2 rounded-sm lg:col-span-10"
          placeholder={language?.[languageName]?.gptSearchPlaceholder}
          ref={searchText}
          maxLength="300"
        />
        <button
          type="submit"
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
