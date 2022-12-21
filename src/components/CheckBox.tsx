import React from "react";
import { css } from "@emotion/react";
import { BsCheckLg } from "react-icons/bs";
import { useColors } from "../recoil/theme";

export type CheckboxProps = {
  className?: string;
  size?: number;
  checked: boolean;
  onClick: () => void;
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
};
const Checkbox = ({
  className,
  size = 20,
  checked,
  onClick,
  backgroundColor,
  borderColor,
  color,
}: CheckboxProps) => {
  const colors = useColors();
  return (
    <span
      className={className}
      css={css`
        border: 1px solid ${borderColor ? borderColor : colors.text};
        width: ${size}px;
        height: ${size}px;
        background-color: ${backgroundColor
          ? backgroundColor
          : colors.background};
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.35rem;
        position: relative;
        overflow: hidden;
        &::after {
          transition: transform 0.3s ease-in-out;
          transform: ${`translateX(${checked ? "100%" : 0})`};
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: ${backgroundColor
            ? backgroundColor
            : colors.background};
        }
      `}
      onClick={onClick}
    >
      <BsCheckLg
        css={css`
          color: ${color ? color : colors.gold};
          width: 100%;
          height: 100%;
        `}
        size={size}
      />
    </span>
  );
};
export default Checkbox;
