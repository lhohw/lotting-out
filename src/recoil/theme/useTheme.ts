import atom from "./atom";
import { selector, useRecoilValue } from "recoil";
import colors from "../../constants/colors";

export type ThemeState = {
  main: string;
  sub: string;
  text: string;
  background: string;
  placeholder: string;
};
const colorState = selector({
  key: "colorState",
  get: ({ get }): ThemeState => {
    const theme = get(atom);
    return {
      main: colors.main,
      sub: colors.sub,
      text: colors.text[theme],
      background: colors.background[theme],
      placeholder: colors.placeholder[theme],
    };
  },
});

export const useColors = () => useRecoilValue(colorState);
export default colorState;
