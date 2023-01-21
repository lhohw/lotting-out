import atom from "./atom";
import { selector, useRecoilValue } from "recoil";
import colors from "../../constants/colors";

export type ColorState = Record<keyof typeof colors, string>;
const colorState = selector({
  key: "colorState",
  get: ({ get }): ColorState => {
    const theme = get(atom);
    return {
      main: colors.main,
      sub: colors.sub,
      white: colors.white,
      dark: colors.dark,
      gold: colors.gold,
      red: colors.red,
      widgetBorder: colors.widgetBorder,
      text: theme === "default" ? "inherit" : colors.text[theme],
      background: theme === "default" ? "inherit" : colors.background[theme],
      placeholder: theme === "default" ? "inherit" : colors.placeholder[theme],
    };
  },
});

export const useColors = () => useRecoilValue(colorState);
export default colorState;
