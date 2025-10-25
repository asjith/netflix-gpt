import { createSlice } from "@reduxjs/toolkit";

const gptSearchSlice = createSlice({
  name: "gptSearch",
  initialState: {
    enableGptSearch: false,
    movieNames: null,
    movieResults: null,
    clickedSearchButton: null,
  },
  reducers: {
    toggleGptSearch: (state) => {
      state.enableGptSearch = !state.enableGptSearch;
      if (state.enableGptSearch == false) {
        state.movieNames = null;
        state.movieResults = null;
        state.clickedSearchButton = null;
      }
    },
    addMovies: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
    toggleClickedSearchButton: (state, action) => {
      state.clickedSearchButton = action.payload;
    },
  },
});

export const { toggleGptSearch, addMovies, toggleClickedSearchButton } =
  gptSearchSlice.actions;
export default gptSearchSlice.reducer;
