import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    videoTitleLogo: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addVideoTitleLogo: (state, action) => {
      state.videoTitleLogo = action.payload;
    },
  },
});

export const { addNowPlayingMovies, addVideoTitleLogo } = moviesSlice.actions;

export default moviesSlice.reducer;
