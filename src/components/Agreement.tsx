import React from "react";
import { css } from "@emotion/react";
import Checkbox, { CheckboxProps } from "./CheckBox";
import colors from "../constants/colors";

export type AgreementProps = CheckboxProps & {
  title: string;
  content: string;
};

const Agreement = ({
  className,
  size,
  checked,
  onClick,
  title,
  content,
}: AgreementProps) => {
  return (
    <div
      className={className}
      css={css`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background-color: ${colors.dark + "dd"};
        color: ${colors.background["light"]};
        padding: 1rem;
        position: relative;
        @media (max-width: 320px) {
          font-size: 0.8rem;
        }
      `}
    >
      <div
        css={css`
          max-height: 20rem;
          overflow-y: scroll;
          overflow-x: hidden;
          padding: 1rem;
          border: 1px solid ${colors.gold};
        `}
        tabIndex={0}
      >
        {content.split("\n").map((c, i) => (
          <p
            key={i}
            css={css`
              padding: 0.5rem 0;
              margin: 0;
            `}
          >
            {c}
          </p>
        ))}
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-top: 1rem;
        `}
      >
        <Checkbox
          backgroundColor={colors.dark}
          color={colors.gold}
          borderColor={colors.text["dark"]}
          size={size}
          checked={checked}
          onClick={onClick}
        />
        <span
          css={css`
            margin-left: 1rem;
          `}
        >
          {title}
        </span>
      </div>
    </div>
  );
};

export default Agreement;
