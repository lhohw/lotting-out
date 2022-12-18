import React from "react";
import { css } from "@emotion/react";
import { useColors } from "../recoil/theme/useTheme";

export type DotsProps = {
  length: number;
  idx: number;
  handleIndex: (idx: number) => void;
};
const Dots = ({ length, idx, handleIndex }: DotsProps) => {
  const colors = useColors();
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
      {new Array(length).fill(undefined).map((_, i) => (
        <li
          key={i}
          css={css`
            width: 12px;
            height: 12px;
            border: 2px solid ${colors.dark};
            border-radius: 50%;
            background-color: ${idx === i ? colors.gold : "#fefefe"};
            cursor: pointer;
            & + li {
              margin-left: 0.3rem;
            }
          `}
          onClick={() => handleIndex(i)}
        />
      ))}
    </ul>
  );
};

export default Dots;
