import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    language: "en",
    isOnline: true,
    fetchError: false,
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
    setIsOnline: (state, action) => {
      state.isOnline = action.payload;
    },
    setFetchError: (state, action) => {
      state.fetchError = action.payload;
    },
  },
});

export const { changeLanguage, setIsOnline, setFetchError } =
  configSlice.actions;
export default configSlice.reducer;
