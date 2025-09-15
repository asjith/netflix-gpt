import { createSlice } from "@reduxjs/toolkit";

const gptSearchSlice = createSlice({
  name: "gptSearch",
  initialState: {
    enableGptSearch: false,
  },
  reducers: {
    toggleGptSearch: (state) => {
      state.enableGptSearch = !state.enableGptSearch;
    },
  },
});

export const { toggleGptSearch } = gptSearchSlice.actions;
export default gptSearchSlice.reducer;
