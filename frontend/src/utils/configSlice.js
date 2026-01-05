import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    language: "en",
    isOnline: true,
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
    setIsOnline: (state, action) => {
      state.isOnline = action.payload;
    },
  },
});

export const { changeLanguage, setIsOnline } = configSlice.actions;
export default configSlice.reducer;
