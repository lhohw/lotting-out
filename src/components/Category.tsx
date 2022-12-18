import type { MenuTitle } from "./Header";
import React from "react";
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
>;

const Category = ({ prioritized, filtered, register }: CategoryProps) => {
  const colors = useColors();
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(9, 1fr);
        grid-auto-rows: 8vw;
        margin: 3rem 1rem;
        grid-auto-flow: row;
        justify-content: end;
        font-size: 1.5rem;
        font-family: Song Myung;
        color: ${colors.background};
        @media (max-width: 768px) {
          font-size: 1.1rem;
        }
      `}
    >
      {prioritized.length
        ? prioritized.map((categoryMenu) => (
            <GridCell
              key={categoryMenu.title}
              {...categoryMenu}
              gridColumn="span 3"
              gridRow="span 3"
            />
          ))
        : null}
      {filtered.length ? (
        <div
          key={"filtered"}
          css={css`
            display: grid;
            grid-column: span 6;
            grid-row: span 3;
            grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
            grid-template-rows: repeat(auto-fit, auto);
          `}
        >
          {filtered.map((categoryMenu) => (
            <GridCell key={categoryMenu.title} {...categoryMenu} />
          ))}
        </div>
      ) : null}
      {register.length ? (
        <GridCell {...register[0]} gridColumn="span 3" gridRow="span 3" />
      ) : null}
    </div>
  );
};

export default Category;
