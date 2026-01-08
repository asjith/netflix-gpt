import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    mainVideoTitleLogo: null,
    mainMovieTrailer: null,
    currentMovieTrailer: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addMainVideoTitleLogo: (state, action) => {
      state.mainVideoTitleLogo = action.payload;
    },
    addMainMovieTrailer: (state, action) => {
      state.mainMovieTrailer = action.payload;
    },
    addCurrentMovieTrailer: (state, action) => {
      state.currentMovieTrailer = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  addMainVideoTitleLogo,
  addMainMovieTrailer,
  addCurrentMovieTrailer,
} = moviesSlice.actions;

export default moviesSlice.reducer;
