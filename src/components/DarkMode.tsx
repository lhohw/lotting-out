import React, { useCallback } from "react";
import { css } from "@emotion/react";
import { useRecoilState } from "recoil";
import { themeState, ThemeState, useColors } from "../recoil/theme";
import { FiSun, FiMoon } from "react-icons/fi";
import useDeviceDetect from "../utils/hooks/useDeviceDetect";

export type DarkModeProps = {
  onFocus?: () => void;
};
const DarkMode = ({ onFocus }: DarkModeProps) => {
  const [theme, setTheme] = useRecoilState<ThemeState>(themeState);
  const colors = useColors();
  const { isTouch } = useDeviceDetect();
  const setMode = useCallback(() => {
    const root = document.querySelector(":root") as HTMLHtmlElement;
    const isPreferDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const nextTheme =
      theme === "light" || (theme === "default" && !isPreferDarkMode)
        ? "dark"
        : "light";
    root.style.setProperty(
      "--text",
      nextTheme === "dark" ? "#d1d1d1" : "#202020"
    );
    root.style.setProperty(
      "--background",
      nextTheme === "dark" ? "#121212" : "#fefefe"
    );
    setTheme(nextTheme);
  }, [theme, setTheme]);
  return (
    <button
      css={css`
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: inherit;
        color: inherit;
        margin-right: 0.5rem;
        border: none;
        position: relative;
        overflow: hidden;
        ${!isTouch &&
        `
          &:hover {
            color: ${colors.gold};
          }
          `}
      `}
      onClick={setMode}
      onFocus={onFocus}
      aria-label="테마 전환"
    >
      <FiMoon
        aria-hidden={true}
        css={css`
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          transition: transform 0.6s ease-in-out, color 0.25s ease-in-out;
          transform-origin: center bottom;
          transform: ${theme === "light" || theme === "default"
            ? "rotate(-90deg) scale(0)"
            : "rotate(0deg) scale(1)"};
          ${theme === "default"
            ? `@media (prefers-color-scheme: dark) {
              transform: rotate(0deg) scale(1);
            }`
            : null}
        `}
        title="밝은 테마로 전환"
      />
      <FiSun
        aria-hidden={true}
        css={css`
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          transition: transform 0.6s ease-in-out, color 0.25s ease-in-out;
          transform-origin: center bottom;
          transform: ${theme === "light" || theme === "default"
            ? "rotate(0deg) scale(1)"
            : "rotate(-90deg) scale(0)"};
          ${theme === "default"
            ? `@media (prefers-color-scheme: dark) {
              transform: rotate(-90deg) scale(0);
            }`
            : null}
        `}
        title="어두운 테마로 전환"
      />
    </button>
  );
};

export default React.memo(DarkMode);
