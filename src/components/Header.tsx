import React from "react";
import { css } from "@emotion/react";
import { Link } from "gatsby";
import { AiOutlineMenu } from "react-icons/ai";
import { useColors } from "../recoil/theme/useTheme";
import PreviewCompatibleImage, {
  PreviewCompatibleImageData,
} from "./PreviewCompatibleImage";
import DarkMode from "./DarkMode";
import { isDesktop } from "react-device-detect";

export type MenuTitle = {
  title: string;
  title_en: string;
};
export type HeaderProps = {
  logo: PreviewCompatibleImageData;
  isOpen: boolean;
  menu: MenuTitle[];
  onKeyDown: (e: React.KeyboardEvent) => void;
  onFocus: () => void;
  hide: () => void;
};
const Header = ({
  logo,
  menu,
  isOpen,
  onKeyDown,
  onFocus,
  hide,
}: HeaderProps) => {
  const colors = useColors();
  return (
    <header
      css={css`
        padding: 1rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 6rem;
      `}
    >
      <Link
        css={css`
          width: 100px;
          min-width: 100px;
          height: 100%;
          box-shadow: 0px 0px 4px ${colors.text};
          margin-left: 4rem;
          @media (max-width: 768px) {
            margin-left: 2rem;
          }
          @media (max-width: 499px) {
            margin-left: 0;
          }
        `}
        to="/"
      >
        <PreviewCompatibleImage
          css={css`
            width: 100%;
            height: 100%;
            object-fit: cover;
          `}
          imageInfo={logo}
        />
      </Link>
      <button
        id="menu"
        type="button"
        aria-expanded={isOpen}
        aria-controls="info-list"
        onFocus={hide}
        css={css`
          display: flex;
          align-items: center;
          margin-left: auto;
          margin-right: 1rem;
          cursor: pointer;
          background-color: transparent;
          border: none;
          color: inherit;
          @media (min-width: 601px) {
            display: none;
          }
        `}
      >
        <AiOutlineMenu size={22} />
      </button>
      <ul
        id="info-list"
        tabIndex={0}
        css={css`
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-evenly;
          list-style: none;
          position: absolute;
          width: ${isOpen ? "100%" : 0};
          right: 0;
          top: 6rem;
          transition: width 0.4s ease-in-out;
          overflow: hidden;
          z-index: 3;
          text-align: center;
          @media (max-width: 768px) {
            font-size: 0.8rem;
          }
          @media (min-width: 601px) {
            position: static;
            flex-direction: row;
            justify-content: flex-end;
            margin: 0 2rem 0 auto;
            width: 100%;
          }
        `}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
      >
        {menu.map(({ title, title_en }, idx) => (
          <li
            key={idx}
            css={css`
              padding: 0;
              margin: 0;
              transition: all 0.15s ease-in-out;
              font-weight: bold;
              font-family: Nanum Gothic;
              word-break: keep-all;
              color: #d1d1d1;
              width: 100%;
              max-width: 100%;
              min-width: ${isOpen ? "auto" : "100px"};
              background-color: #12121277;
              ${isDesktop &&
              `
                &:hover {
                  background-color: #121212aa;
                }
                `}
              @media (min-width: 601px) {
                margin: 0.2rem;
                color: inherit;
                width: auto;
                max-width: auto;
                min-width: auto;
                background-color: inherit;
                &:hover {
                  background-color: inherit;
                }
              }
            `}
          >
            <Link
              data-idx={idx}
              css={css`
                padding: 0.5rem;
                margin: 0.1rem;
                width: 100%;
                height: 100%;
                display: flex;
                flex: 1;
                align-items: center;
                justify-content: center;
                ${isDesktop &&
                `
                  &:hover {
                    font-weight: 900;
                    color: ${colors.gold};
                  }
                  `}
                @media (min-width: 601px) {
                  margin: 0;
                }
              `}
              to={`/info/${title_en.split(" ").join("-")}`}
            >
              <h2
                css={css`
                  padding: 0;
                  margin: 0;
                  font-size: inherit;
                `}
              >
                {title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
      <DarkMode key="darkmode" onFocus={hide} />
    </header>
  );
};

export default Header;
