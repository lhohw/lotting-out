import React from "react";
import { css } from "@emotion/react";
import { Link } from "gatsby";
import { AiOutlineMenu } from "react-icons/ai";
import { useColors } from "../recoil/theme/useTheme";
import PreviewCompatibleImage, {
  PreviewCompatibleImageData,
} from "./PreviewCompatibleImage";
import DarkMode from "./DarkMode";
import { isMobile } from "react-device-detect";

export type MenuTitle = {
  title: string;
  title_en: string;
};
export type HeaderProps = {
  logo: PreviewCompatibleImageData;
  isOpen: boolean;
  menu: MenuTitle[];
};
const Header = ({ logo, menu, isOpen }: HeaderProps) => {
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
            margin-left: ${isMobile ? 0 : "2rem"};
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
        css={css`
          display: flex;
          flex-direction: column;
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
      >
        {menu.map(({ title, title_en }, idx) => (
          <li
            key={idx}
            css={css`
              cursor: pointer;
              max-width: 100px;
              min-width: 50px;
              width: 100px;
              justify-content: center;
              align-items: center;
              padding: 0.5rem 0;
              transition: all 0.15s ease-in-out;
              display: flex;
              flex: 1;
              font-weight: bold;
              font-family: Nanum Gothic;
              color: inherit;
              word-break: keep-all;
              &:hover {
                font-weight: 900;
                color: ${colors.gold};
              }
              @media (max-width: 600px) {
                color: #d1d1d1;
                width: 100%;
                max-width: 100%;
                min-width: ${isOpen ? "auto" : "100px"};
                background-color: #12121277;
                &:hover {
                  background-color: #121212aa;
                }
              }
            `}
          >
            <Link
              css={css`
                width: 100%;
                height: 100%;
              `}
              to={`/info/${title_en}`}
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
      <DarkMode key="darkmode" />
    </header>
  );
};

export default Header;
