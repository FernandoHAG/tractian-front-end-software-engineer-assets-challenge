import { createSlice } from "@reduxjs/toolkit";
import i18next from "../i18n/i18n";
const { changeLanguage } = i18next;

const initialState = {
  idiom: "us",
  theme: "dark",
};

export const slice = createSlice({
  name: "config",
  initialState: initialState,
  reducers: {
    changeIdiom(state, { payload }) {
      changeLanguage(payload);
      return { ...state, idiom: payload };
    },
    changeTheme(state, { payload }) {
      return { ...state, theme: payload };
    },
  },
});

export const { changeIdiom, changeTheme } = slice.actions;
export const selectConfig = (state: {
  config: { idiom: string; theme: string };
}) => state.config;
export default slice.reducer;
