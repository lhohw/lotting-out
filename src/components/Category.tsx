import type { MenuTitle } from "./Header";
import React, { useMemo } from "react";
import { css } from "@emotion/react";
import { PreviewCompatibleImageData } from "./PreviewCompatibleImage";
import GridCell from "./GridCell";
import { useColors } from "../recoil/theme/useTheme";

export type CategoryMenu = MenuTitle & {
  thumbnail: PreviewCompatibleImageData["image"];
};
export type CategoryProps = Record<
  "prioritized" | "filtered" | "register",
  CategoryMenu[]
> & {
  logo: PreviewCompatibleImageData;
};

const Category = ({ prioritized, filtered, register, logo }: CategoryProps) => {
  const colors = useColors();
  const arr = useMemo(
    () => prioritized.concat(filtered).concat(register),
    [prioritized, filtered, register]
  );
  return (
    <section
      css={css`
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: 30vw;
        margin: 3rem 1rem;
        grid-auto-flow: row;
        justify-content: end;
        font-size: 1.5rem;
        font-family: Song Myung;
        color: ${colors.background};
        @media (max-width: 768px) {
          font-size: 1.1rem;
          grid-template-columns: repeat(2, 1fr);
        }
        @media (max-width: 499px) {
          grid-auto-rows: 8vw;
        }
      `}
    >
      {arr.length
        ? arr.map((categoryMenu) => (
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
