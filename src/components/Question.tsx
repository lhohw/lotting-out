import React from "react";
import { css } from "@emotion/react";
import { useColors } from "../recoil/theme/useTheme";

export type QuestionProps = {
  title: string;
  keys: string[];
  name: string;
  value: string;
  className?: string;
};

const Question = ({ title, keys, name, value, className }: QuestionProps) => {
  const colors = useColors();
  return (
    <fieldset
      className={className}
      css={css`
        display: flex;
        flex-direction: column;
        margin-top: 0;
        border: none;
        background-color: ${colors.dark + "dd"};
        border-radius: 10px;
      `}
    >
      <legend
        css={css`
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
          padding: 3rem 1rem 0 1rem;
          font-weight: bold;
          color: ${colors.gold};
        `}
      >
        {title}
      </legend>
      {keys.map((key) => (
        <label
          key={key}
          css={css`
            display: flex;
            flex-direction: row;
            padding: 0.3rem;
            color: ${value === key ? colors.gold : "#fefefedd"};
          `}
        >
          <input
            css={css`
              margin-right: 1rem;
              cursor: pointer;
              margin-bottom: 0.11rem;
              accent-color: ${colors.gold};
            `}
            type="radio"
            name={name}
            value={key}
          />
          {key}
        </label>
      ))}
    </fieldset>
  );
};

export default React.memo(
  Question,
  (prevProps, nextProps) => prevProps.value === nextProps.value
);
