import React, { useCallback } from "react";
import { css } from "@emotion/react";
import { useRecoilState } from "recoil";
import { ThemeState, themeState } from "../recoil/theme";
import { useColors } from "../recoil/theme";
import useDeviceDetect from "../utils/hooks/useDeviceDetect";
import { FiSun, FiMoon } from "react-icons/fi";

export type DarkModeButtonProps = {
  className?: string;
};

export const DarkModeButton = (props: DarkModeButtonProps) => {
  const { className } = props;
  const colors = useColors();
  const { isTouch } = useDeviceDetect();
  const [theme, setTheme] = useRecoilState<ThemeState>(themeState);

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
      aria-label={"테마 변환"}
      className={className}
      css={css`
        display: flex;
        flex-direction: row;
        flex: 1;
        align-items: center;
        background-color: ${colors.dark + "88"};
        padding: 0.3rem;
        margin-top: 0.3rem;
        border: 2px solid ${colors.gold};
        border-radius: 20px;
        justify-content: flex-end;
        width: calc(44px + 0.6rem);
        transition: width 0.4s ease-in-out;
        color: ${colors.white};
        font-size: 0.8rem;
        font-weight: bold;
        cursor: pointer;
        ${!isTouch &&
        `
          &:hover {
            width: calc(154px + 0.6rem);
            & > span:nth-of-type(2) {
              width: 100px;
            }
          }
          `}
        @media (max-width: 400px) {
          width: calc(34px + 0.6rem);
        }
      `}
      onClick={setMode}
    >
      <span
        css={css`
          width: 40px;
          height: 40px;
          border-radius: 8px;
          padding: 0.2rem;
          position: relative;
          @media (max-width: 400px) {
            width: 30px;
            height: 30px;
          }
        `}
      >
        <FiMoon
          aria-hidden={true}
          css={css`
            position: absolute;
            left: 0;
            top: 0;
            padding: 0.2rem;
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
            padding: 0.2rem;
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
      </span>
      <span
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          width: 0;
          overflow: hidden;
          word-break: keep-all;
          white-space: nowrap;
          height: 100%;
          transition: width 0.4s ease-in-out;
        `}
      >
        테마 변환
      </span>
    </button>
  );
};

export default DarkModeButton;
