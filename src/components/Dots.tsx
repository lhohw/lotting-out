import type { PreviewCompatibleImageData } from "./PreviewCompatibleImage";
import React from "react";
import { css } from "@emotion/react";
import colors from "../constants/colors";

export type DotsProps = {
  imageInfos: PreviewCompatibleImageData[];
  idx: number;
  handleIndex: (idx: number) => void;
};
const Dots = ({ imageInfos, idx, handleIndex }: DotsProps) => {
  return (
    <ul
      css={css`
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 1rem;
        display: flex;
        flex-direction: row;
      `}
    >
      {imageInfos.map((imageInfo, i) => (
        <li
          key={i}
          css={css`
            padding: 0;
            margin: 0;
            & + li {
              margin-left: 0.3rem;
            }
          `}
        >
          <button
            type="button"
            aria-pressed={idx === i}
            aria-label={`${i + 1}번째 이미지로 이동 - ${imageInfo.title}`}
            aria-describedby={imageInfo.alt}
            css={css`
              width: 12px;
              height: 12px;
              border: 2px solid ${colors.dark};
              padding: 0;
              margin: 0;
              border-radius: 50%;
              background-color: ${idx === i ? colors.gold : "#fefefe"};
              cursor: pointer;
            `}
            onClick={() => handleIndex(i)}
          />
        </li>
      ))}
    </ul>
  );
};

export default React.memo(
  Dots,
  (prevProps, nextProps) => prevProps.idx === nextProps.idx
);
