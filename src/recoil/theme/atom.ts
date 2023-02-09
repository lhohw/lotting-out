import { atom } from "recoil";

export type ThemeState = "default" | "light" | "dark";

// const initialState = "default" as ThemeState;
const initialState =
  typeof window === "undefined"
    ? "default"
    : window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : ("light" as ThemeState);

const themeState = atom({
  key: "themeState",
  default: initialState,
});

export default themeState;
