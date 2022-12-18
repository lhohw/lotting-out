import { atom } from "recoil";

export type ThemeState = "light" | "dark";

// const initialState: ThemeState = "light";
const initialState: ThemeState = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches
  ? "dark"
  : "light";
const themeState = atom({
  key: "themeState",
  default: initialState,
});

export default themeState;
