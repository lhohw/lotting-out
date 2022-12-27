import type { CategoryMenu } from "./Category";
import React from "react";
import { css } from "@emotion/react";
import { Link } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import { useColors } from "../recoil/theme/useTheme";
import { isMobile, isBrowser } from "react-device-detect";

type GridCellProps = { gridColumn?: string; gridRow?: string } & CategoryMenu;
const GridCell = ({
  gridColumn = "auto",
  gridRow = "auto",
  title,
  title_en,
  thumbnail,
}: GridCellProps) => {
  const colors = useColors();
  return (
    <Link
      to={`/info/${title_en}`}
      css={css`
        display: grid;
        border: 1px solid ${colors.widgetBorder};
        margin: 0.4rem;
        cursor: pointer;
        grid-column: ${gridColumn};
        grid-row: ${gridRow};
        position: relative;
        transition: all 0.25s ease-in-out;
        box-shadow: 1px 2px 4px ${colors.widgetBorder};
        overflow: hidden;
        background-color: "inherit";
        ${isBrowser &&
        `
            &::after {
              content: "";
              width: 100%;
              height: 100%;
              position: absolute;
              background-color: ${colors.widgetBorder + "88"};
              transition: opacity 0.25s ease-in-out;
            }
            &:hover::after {
              opacity: 0;
            }
            
          `}
      `}
    >
      <span
        css={css`
          position: absolute;
          z-index: 1;
          left: ${isMobile ? ".3rem" : "1rem"};
          top: ${isMobile ? ".3rem" : "1rem"};
          text-shadow: 1px 1px 5px #fefefe;
          color: #202020;
          /* font-size: ${isMobile ? ".8rem" : "1rem"}; */
        `}
      >
        {title}
      </span>
      {thumbnail ? (
        <PreviewCompatibleImage
          imageInfo={{ image: thumbnail, title, alt: title }}
        />
      ) : null}
    </Link>
  );
};

export default GridCell;
