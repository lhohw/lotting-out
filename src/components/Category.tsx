import type { MenuTitle } from "./Header";
import React from "react";
import { css } from "@emotion/react";
import { PreviewCompatibleImageData } from "./PreviewCompatibleImage";
import GridCell from "./GridCell";
import { useColors } from "../recoil/theme/useTheme";

export type CategoryMenu = MenuTitle & {
  thumbnail: PreviewCompatibleImageData["image"];
};
export type CategoryProps = {
  menu: CategoryMenu[];
  logo: PreviewCompatibleImageData;
};

const Category = ({ menu, logo }: CategoryProps) => {
  const colors = useColors();
  return (
    <section
      css={css`
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-auto-rows: 20vw;
        margin: 3rem auto;
        padding: 0 1rem;
        grid-auto-flow: row;
        justify-content: end;
        font-size: 1.5rem;
        font-family: "Song Myung";
        font-display: swap;
        color: ${colors.background};
        max-width: 1400px;
        @media (max-width: 1024px) {
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 30vw;
        }
        @media (max-width: 768px) {
          font-size: 1.1rem;
          grid-template-columns: repeat(2, 1fr);
        }
      `}
    >
      {menu.length
        ? menu.map((categoryMenu) => (
            <GridCell
              key={categoryMenu.title}
              {...categoryMenu}
              gridColumn="span 1"
              gridRow="span 1"
              logo={logo}
            />
          ))
        : null}
    </section>
  );
};

export default Category;
