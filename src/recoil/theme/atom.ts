import { atom } from "recoil";

export type ThemeState = "default" | "light" | "dark";

const initialState = "default" as ThemeState;

const themeState = atom({
  key: "themeState",
  default: initialState,
});

export default themeState;
