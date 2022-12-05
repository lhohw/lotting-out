import React from "react";
import { css } from "@emotion/react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import Dots from "./Dots";
import colors from "../constants/colors";

export type SliderProps = {
  idx: number;
  images: IGatsbyImageData[];
  alts: string[];
  handleIndex: (idx: number) => void;
};
const Slider = ({ idx, images, alts, handleIndex }: SliderProps) => (
  <div
    css={css`
      width: 100%;
      height: 25rem;
      overflow: hidden;
      position: relative;
      box-shadow: 0px 2px 8px ${colors.text["light"]};
    `}
  >
    <div
      css={css`
        display: flex;
        flex-direction: row;
        width: ${100 * images.length}vw;
        min-width: ${100 * images.length}vw;
        max-width: ${1200 * images.length}px;
        height: 100%;
        will-change: transform;
        transform: ${`translateX(${-idx * 100}vw)`};
        transition: transform 0.4s ease-in-out;
      `}
    >
      {images.map((image, i) => (
        <GatsbyImage
          key={i}
          css={css`
            min-width: 100vw;
            width: 100vw;
            max-width: 1200px;
            height: 100%;
            object-fit: contain;
          `}
          loading="eager"
          image={image}
          alt={alts[i]}
          draggable={false}
          onDrag={(e) => e.preventDefault()}
        />
      ))}
    </div>
    {idx !== 0 && (
      <FiChevronLeft
        css={css`
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 1rem;
          cursor: pointer;
        `}
        size={40}
        color={colors.main}
        onClick={() => handleIndex(idx - 1)}
      />
    )}
    {idx !== images.length - 1 && (
      <FiChevronRight
        css={css`
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 1rem;
          cursor: pointer;
        `}
        size={40}
        color={colors.main}
        onClick={() => handleIndex(idx + 1)}
      />
    )}
    <Dots length={images.length} idx={idx} handleIndex={handleIndex} />
  </div>
);

export default Slider;
