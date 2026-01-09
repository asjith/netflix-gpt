import { createSlice } from "@reduxjs/toolkit";

const gptSearchSlice = createSlice({
  name: "gptSearch",
  initialState: {
    enableGptSearch: false,
    movieNames: null,
    movieResults: null,
    clickedSearchButton: null,
    notFound: false,
  },
  reducers: {
    setGptSearch: (state, action) => {
      state.enableGptSearch = action.payload;
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
    setNotFound: (state, action) => {
      state.notFound = action.payload;
    },
  },
});

export const {
  setGptSearch,
  addMovies,
  toggleClickedSearchButton,
  setNotFound,
} = gptSearchSlice.actions;
export default gptSearchSlice.reducer;
