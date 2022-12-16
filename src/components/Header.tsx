import type { IGatsbyImageData } from "gatsby-plugin-image";

import React from "react";
import { css } from "@emotion/react";
import { Link } from "gatsby";
import { AiOutlineMenu } from "react-icons/ai";
import { useColors } from "../recoil/theme/useTheme";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

export type HeaderProps = {
  logo: {
    image:
      | string
      | {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
    alt: string;
    title: string;
  };
  isOpen: boolean;
  menu: string[];
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
        height: 7rem;
      `}
    >
      <Link
        css={css`
          width: 100px;
          min-width: 100px;
          height: 100%;
          box-shadow: 0px 2px 4px ${colors.text};
          margin-left: 4rem;
          @media (max-width: 768px) {
            margin-left: 2rem;
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
      <AiOutlineMenu
        id="menu"
        size={25}
        css={css`
          margin-left: auto;
          margin-right: 2rem;
          cursor: pointer;
          @media (min-width: 600px) {
            display: none;
          }
        `}
      />
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
          overflow: ${isOpen ? "visible" : "hidden"};
          z-index: 1;
          text-align: center;
          @media (max-width: 768px) {
            font-size: 0.8rem;
          }
          @media (min-width: 600px) {
            position: static;
            flex-direction: row;
            justify-content: flex-end;
            margin: 0 2rem 0 auto;
            width: 100%;
          }
        `}
      >
        {menu.map((title, idx) => (
          <li
            key={idx}
            css={css`
              cursor: pointer;
              max-width: 100px;
              min-width: 50px;
              width: 100px;
              transition: all 0.15s ease-in-out;
              justify-content: center;
              padding: 0.5rem 0;
              display: flex;
              flex: 1;
              font-weight: bold;
              font-family: Nanum Gothic;
              &:hover {
                font-weight: 900;
                color: ${colors.main};
              }
              @media (max-width: 600px) {
                width: 100%;
                max-width: 100%;
                min-width: ${isOpen ? "auto" : "100px"};
                background-color: ${colors.background + "77"};
                &:hover {
                  background-color: ${colors.background + "aa"};
                }
              }
            `}
          >
            <Link
              to={"/blog"}
              css={css`
                width: 100%;
              `}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
