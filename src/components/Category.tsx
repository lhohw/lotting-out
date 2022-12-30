import type { MenuTitle } from "./Header";
import React, { useMemo } from "react";
import { css } from "@emotion/react";
import { PreviewCompatibleImageData } from "./PreviewCompatibleImage";
import GridCell from "./GridCell";
import { useColors } from "../recoil/theme/useTheme";
import { isMobile } from "react-device-detect";

export type CategoryMenu = MenuTitle & {
  thumbnail: PreviewCompatibleImageData["image"];
};
export type CategoryProps = Record<
  "prioritized" | "filtered" | "register",
  CategoryMenu[]
>;

const CategoryDesktop = ({
  prioritized,
  filtered,
  register,
}: CategoryProps) => {
  const colors = useColors();
  return (
    <section
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
    </section>
  );
};

const CategoryMobile = ({ prioritized, filtered, register }: CategoryProps) => {
  const colors = useColors();
  const arr = useMemo(
    () => prioritized.concat(filtered).concat(register),
    [prioritized, filtered, register]
  );
  return (
    <section
      css={css`
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: 30vw;
        margin: 3rem 1rem;
        grid-auto-flow: row;
        justify-content: end;
        font-size: 1.5rem;
        font-family: Song Myung;
        color: ${colors.background};
        font-size: 0.8rem;
      `}
    >
      {arr.length
        ? arr.map((categoryMenu) => (
            <GridCell
              key={categoryMenu.title}
              {...categoryMenu}
              gridColumn="span 1"
              gridRow="span 1"
            />
          ))
        : null}
    </section>
  );
};
const Category = (props: CategoryProps) =>
  isMobile ? <CategoryMobile {...props} /> : <CategoryDesktop {...props} />;
export default Category;
