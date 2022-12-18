import atom from "./atom";
import { selector, useRecoilValue } from "recoil";
import colors from "../../constants/colors";

export type ThemeState = Record<keyof typeof colors, string>;
const colorState = selector({
  key: "colorState",
  get: ({ get }): ThemeState => {
    const theme = get(atom);
    return {
      main: colors.main,
      sub: colors.sub,
      dark: colors.dark,
      gold: colors.gold,
      red: colors.red,
      widgetBorder: colors.widgetBorder,
      text: colors.text[theme],
      background: colors.background[theme],
      placeholder: colors.placeholder[theme],
    };
  },
});

export const useColors = () => useRecoilValue(colorState);
export default colorState;
