import type { PreviewTemplateComponentProps } from "netlify-cms-core";
import React, { useState } from "react";
import { css } from "@emotion/react";
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
        margin-top: 1rem;
        padding: 1rem;
      `}
    >
      {list.length ? (
        <div
          css={css`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
          `}
        >
          {list.map((title, i) => (
            <button
              key={title}
              css={css`
                display: flex;
                padding: 1rem 2rem;
                align-items: center;
                justify-content: center;
                color: ${i === idx ? colors.gold : colors.text};
                font-weight: ${i === idx ? "bold" : "normal"};
                font-size: 1.4rem;
                background-color: ${i === idx
                  ? colors.dark
                  : colors.background};
                border: 2px solid ${colors.widgetBorder};
                border-radius: 8px;
                transition: all 0.25s ease-in-out;
                cursor: pointer;
                & + button {
                  margin-left: 2rem;
                }
              `}
              onClick={() => setIdx(i)}
            >
              {title}
            </button>
          ))}
        </div>
      ) : null}
      {data.map(({ type, images, markdown, sub, title }, i) => (
        <React.Fragment key={title}>
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
