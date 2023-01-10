import type { IconType } from "react-icons";
import React from "react";
import { css } from "@emotion/react";
import { Link } from "gatsby";
import { useColors } from "../recoil/theme";
import useDeviceDetect from "../utils/hooks/useDeviceDetect";

type ImageButton = {
  type: "image";
  ImageComponent: React.ReactNode;
};
type IconButton = {
  type: "icon";
  Icon: IconType;
};
export type ControlButtonProps = (ImageButton | IconButton) & {
  title: string;
  onClick?: () => void;
  className?: string;
  isLink?: boolean;
  to?: string;
  refProp?: React.MutableRefObject<HTMLButtonElement>;
  href?: string;
};

export const ControlButton = (props: ControlButtonProps) => {
  const { type, title, onClick, isLink = false, to, refProp } = props;
  const colors = useColors();
  const { isTouch } = useDeviceDetect();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Button = (props: any) =>
    isLink ? (
      <Link to={to} {...props}>
        {props.children}
      </Link>
    ) : (
      <button ref={refProp} {...props}>
        {props.children}
      </button>
    );
  return (
    <Button
      aria-label={title}
      className={props.className}
      css={css`
        display: flex;
        flex-direction: row;
        flex: 1;
        align-items: center;
        background-color: ${colors.dark + "88"};
        padding: 0.3rem;
        margin-top: 0.3rem;
        border: 2px solid ${colors.gold};
        border-radius: 20px;
        justify-content: flex-end;
        width: calc(44px + 0.6rem);
        transition: all 0.4s ease-in-out;
        color: ${colors.white};
        font-size: 0.8rem;
        font-weight: bold;
        cursor: pointer;
        ${!isTouch &&
        `
          &:hover {
            width: calc(154px + 0.6rem);
            & > span:nth-of-type(2) {
              width: 100px;
            }
          }
          `}
        @media (max-width: 400px) {
          width: calc(34px + 0.6rem);
        }
      `}
      onClick={onClick}
    >
      <span
        css={css`
          width: 40px;
          height: 40px;
          border-radius: 8px;
          padding: 0.2rem;
          @media (max-width: 400px) {
            width: 30px;
            height: 30px;
          }
        `}
      >
        {type === "image" ? (
          props.ImageComponent
        ) : (
          <props.Icon
            aria-hidden={true}
            css={css`
              width: 100%;
              height: 100%;
            `}
          />
        )}
      </span>
      <span
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          width: 0;
          overflow: hidden;
          word-break: keep-all;
          white-space: nowrap;
          height: 100%;
          transition: width 0.4s ease-in-out;
        `}
      >
        {title}
      </span>
    </Button>
  );
};

export default ControlButton;
