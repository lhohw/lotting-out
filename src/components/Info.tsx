import type { PreviewTemplateComponentProps } from "netlify-cms-core";
import React, { useState } from "react";
import { css } from "@emotion/react";
import { v4 as uuidv4 } from "uuid";
import { isMobile } from "react-device-detect";
import { PreviewCompatibleImageData } from "./PreviewCompatibleImage";
import Images from "./Images";
import { useColors } from "../recoil/theme/useTheme";

export type InfoProps = {
  data: {
    type: "subInfo" | "images" | "markdown";
    images: PreviewCompatibleImageData[];
    markdown: string;
    sub: InfoProps["data"];
    title?: string;
  }[];
  className?: string;
  title_en: string;
  depth: number;
  isPreview?: boolean;
  getAsset?: PreviewTemplateComponentProps["getAsset"];
};

const Info = ({
  data,
  className,
  title_en,
  depth,
  isPreview = false,
  getAsset,
}: InfoProps) => {
  const [idx, setIdx] = useState(0);
  const list = data.map((p) => p.title).filter(Boolean);
  const colors = useColors();
  if (data.length === 0) return null;
  return (
    <div
      className={className}
      css={css`
        display: flex;
        flex-direction: column;
        margin-top: ${isMobile ? "0.5rem" : "1rem"};
        padding: ${isMobile ? "0.5rem" : "1rem"};
      `}
    >
      {list.length ? (
        <div
          css={css`
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
          `}
        >
          {list.map((title, i) => (
            <button
              key={uuidv4()}
              css={css`
                display: flex;
                padding: ${isMobile ? ".6rem 1.2rem" : "1rem 2rem"};
                align-items: center;
                justify-content: center;
                color: ${i === idx ? colors.gold : colors.text};
                font-weight: ${i === idx ? "900" : "normal"};
                font-size: ${isMobile ? "0.8rem" : "1.4rem"};
                background-color: ${i === idx
                  ? colors.dark
                  : colors.background};
                border: 2px solid ${colors.widgetBorder};
                border-radius: 8px;
                transition: all 0.25s ease-in-out;
                cursor: pointer;
                margin: ${isMobile ? "0 0.5rem" : "0.5rem 1rem"};
              `}
              onClick={() => setIdx(i)}
            >
              <h2
                css={css`
                  margin: 0;
                  padding: 0;
                  font-size: inherit;
                `}
              >
                {title}
              </h2>
            </button>
          ))}
        </div>
      ) : null}
      {data.map(({ type, images, markdown, sub }, i) => (
        <React.Fragment key={uuidv4()}>
          {type === "images" ? (
            <Images
              css={css`
                display: ${i === idx ? "inherit" : "none"};
              `}
              images={images}
              title_en={title_en}
              isPreview={isPreview}
              getAsset={getAsset}
            />
          ) : type === "subInfo" ? (
            <Info
              css={css`
                display: ${i === idx ? "inherit" : "none"};
              `}
              title_en={title_en}
              data={sub}
              depth={depth + 1}
              isPreview={isPreview}
              getAsset={getAsset}
            />
          ) : type === "markdown" ? (
            <span>{`markdown: ${markdown}`}</span>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Info;
