import type { IGatsbyImageData } from "gatsby-plugin-image";

import React from "react";
import { css } from "@emotion/react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { useColors } from "../recoil/theme/useTheme";

export type HeaderProps = {
  logo_image: IGatsbyImageData;
  logo_image_alt: string;
  menu: string[];
};
const Header = ({ logo_image, logo_image_alt, menu }: HeaderProps) => {
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
          box-shadow: 0px 2px 4px ${colors.text};
        `}
        to="/"
      >
        <GatsbyImage
          css={css`
            width: 100%;
            height: 100%;
            object-fit: contain;
          `}
          image={logo_image}
          alt={logo_image_alt}
        />
      </Link>
      <ul
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
          margin-right: 2rem;
          margin-left: auto;
          list-style: none;
        `}
      >
        {menu.map((title, idx) => (
          <li
            key={idx}
            css={css`
              cursor: pointer;
              transition: all 0.15s ease-in-out;
              &:hover {
                font-weight: 900;
                color: ${colors.main};
              }
              & + & {
                margin-left: 1.5rem;
              }
            `}
          >
            <Link to={title}>{title}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
