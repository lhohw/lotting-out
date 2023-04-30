import React, {
  MutableRefObject,
  MouseEventHandler,
  TouchEventHandler,
} from "react";
import { css } from "@emotion/react";

import PreviewCompatibleImage, {
  PreviewCompatibleImageData,
} from "./PreviewCompatibleImage";
import Jumbotron from "./Jumbotron";
import Dots from "./Dots";

import { useColors } from "../recoil/theme";
import useDeviceState from "../hooks/useDeviceState";

export type SliderProps = {
  slider: MutableRefObject<HTMLDivElement>;
  wrapper: MutableRefObject<HTMLDivElement>;
  apartment: string;
  short: string;
  idx: number;
  imageInfos: PreviewCompatibleImageData[];
  handleIndex: (idx: number) => void;
  onTouchStart: TouchEventHandler<HTMLDivElement>;
  onTouchEnd: () => void;
  onMouseDown: MouseEventHandler<HTMLDivElement>;
  onMouseUp: () => void;
  onSelect: MouseEventHandler<HTMLDivElement>;
};
const Slider = ({
  slider,
  wrapper,
  apartment,
  short,
  idx,
  imageInfos,
  handleIndex,
  onTouchStart,
  onTouchEnd,
  onMouseDown,
  onMouseUp,
  onSelect,
}: SliderProps) => {
  const { isTouch, isInitialized } = useDeviceState();
  const colors = useColors();
  return (
    <div
      css={css`
        width: 100%;
        height: 30rem;
        overflow: hidden;
        position: relative;
        box-shadow: 0px 2px 8px ${colors.text};
        @media (min-width: 1440px) {
          height: 40rem;
        }
      `}
    >
      <Jumbotron title={apartment} content={short} />
      {!wrapper?.current ? null : (
        <div
          ref={slider}
          style={{
            transform: `translateX(${
              -wrapper.current.getClientRects()[0].width * (idx + 1)
            }px)`,
          }}
          css={css`
            display: flex;
            flex-direction: row;
            width: ${(imageInfos.length ? imageInfos.length + 2 : 1) *
            wrapper.current.getClientRects()[0].width}px;
            height: 100%;
            will-change: transform;
            transition: transform 0.4s ease-in-out;
          `}
        >
          {imageInfos.length ? (
            <PreviewCompatibleImage
              aria-hidden={true}
              key={"-1"}
              css={css`
                display: flex;
                flex: 1;
                height: 100%;
                object-fit: cover;
              `}
              loading="lazy"
              imageInfo={imageInfos[imageInfos.length - 1]}
              draggable={false}
            />
          ) : null}
          {imageInfos.map((imageInfo, i) => (
            <PreviewCompatibleImage
              aria-hidden={true}
              key={i}
              css={css`
                display: flex;
                flex: 1;
                height: 100%;
                object-fit: cover;
              `}
              loading={i === 0 ? "eager" : "lazy"}
              imageInfo={imageInfo}
              draggable={false}
            />
          ))}
          {imageInfos.length ? (
            <PreviewCompatibleImage
              aria-hidden={true}
              key={imageInfos.length.toString()}
              css={css`
                display: flex;
                flex: 1;
                height: 100%;
                object-fit: cover;
              `}
              loading="lazy"
              imageInfo={imageInfos[0]}
              draggable={false}
            />
          ) : null}
        </div>
      )}
      <div
        ref={wrapper}
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: ${colors.placeholder} + "11";
          z-index: 2;
        `}
        onTouchStart={isInitialized && isTouch ? onTouchStart : undefined}
        onTouchEnd={isInitialized && isTouch ? onTouchEnd : undefined}
        onMouseDown={!isInitialized || isTouch ? undefined : onMouseDown}
        onMouseUp={!isInitialized || isTouch ? undefined : onMouseUp}
        onMouseLeave={!isInitialized || isTouch ? undefined : onMouseUp}
        onSelect={onSelect}
      >
        <Dots imageInfos={imageInfos} idx={idx} handleIndex={handleIndex} />
      </div>
    </div>
  );
};

export default Slider;
