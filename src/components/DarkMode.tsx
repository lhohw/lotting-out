import React from "react";
import { css } from "@emotion/react";
import { useRecoilState } from "recoil";
import { themeState, ThemeState, useColors } from "../recoil/theme";
import { FiSun, FiMoon } from "react-icons/fi";

const DarkMode = () => {
  const [theme, setTheme] = useRecoilState<ThemeState>(themeState);
  const colors = useColors();
  const setMode = () => {
    const root = document.querySelector(":root") as HTMLHtmlElement;
    root.style.setProperty("--text", theme === "light" ? "#d1d1d1" : "#202020");
    root.style.setProperty(
      "--background",
      theme === "light" ? "#121212" : "#fefefe"
    );
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <button
      css={css`
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: ${colors.background};
        transition: all 0.125s ease-in-out;
        color: ${colors.text};
        margin-right: 0.5rem;
        border: none;
      `}
      onClick={setMode}
    >
      {theme === "dark" ? (
        <FiMoon
          css={css`
            width: 100%;
            height: 100%;
          `}
        />
      ) : (
        <FiSun
          css={css`
            width: 100%;
            height: 100%;
          `}
        />
      )}
    </button>
  );
};

export default React.memo(DarkMode);
