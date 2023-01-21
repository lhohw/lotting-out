import type { CategoryMenu } from "./Category";
import React from "react";
import { css } from "@emotion/react";
import { Link } from "gatsby";
import PreviewCompatibleImage, {
  PreviewCompatibleImageData,
} from "./PreviewCompatibleImage";
import { useRecoilState } from "recoil";
import { DeviceState, deviceState as ds } from "../recoil/deviceDetect";
import colors from "../constants/colors";

type GridCellProps = {
  gridColumn?: string;
  gridRow?: string;
  logo: PreviewCompatibleImageData;
} & CategoryMenu;
const GridCell = ({
  gridColumn = "auto",
  gridRow = "auto",
  title,
  title_en,
  thumbnail,
  logo,
}: GridCellProps) => {
  const [deviceState] = useRecoilState<DeviceState>(ds);
  const { isTouch } = deviceState;
  return (
    <Link
      to={`/info/${title_en.split(" ").join("-")}`}
      aria-labelledby={title_en}
      css={css`
        display: grid;
        border: 1px solid ${colors.widgetBorder};
        margin: 0.5rem;
        cursor: pointer;
        grid-column: ${gridColumn};
        grid-row: ${gridRow};
        position: relative;
        transition: all 0.25s ease-in-out;
        box-shadow: 1px 2px 4px ${colors.widgetBorder};
        overflow: hidden;
        background-color: "inherit";
        ${!isTouch &&
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
            &:focus::after {
              opacity: 0;
            }
          `}
      `}
    >
      <span
        id={title_en}
        css={css`
          position: absolute;
          z-index: 1;
          left: 1rem;
          top: 1rem;
          text-shadow: 1px 1px 5px #fefefe;
          color: #202020;
          @media (max-width: 600px) {
            left: 0.3rem;
            top: 0.3rem;
            font-size: 0.8rem;
          }
        `}
      >
        {title}
      </span>
      {thumbnail ? (
        <PreviewCompatibleImage
          imageInfo={{ image: thumbnail, title, alt: title }}
          loading="lazy"
        />
      ) : logo ? (
        <PreviewCompatibleImage imageInfo={logo} loading="lazy" />
      ) : null}
    </Link>
  );
};

export default React.memo(GridCell);
