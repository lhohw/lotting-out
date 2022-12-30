import React from "react";
import { css } from "@emotion/react";
import { useColors } from "../recoil/theme/useTheme";

export type QuestionProps = {
  question: string;
  answers: string[];
  value: string;
  name: string;
  className?: string;
  isPreview?: boolean;
};

const Question = ({
  question,
  answers,
  value,
  name,
  className,
  isPreview = false,
}: QuestionProps) => {
  const colors = useColors();
  return (
    <fieldset
      className={className}
      css={css`
        display: flex;
        flex: 1;
        width: 100%;
        flex-direction: column;
        margin: 0 auto;
        border: none;
        background-color: ${colors.dark + "dd"};
        border-radius: 10px;
        max-width: ${isPreview ? "500px" : "auto"};
      `}
    >
      <legend
        css={css`
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
          padding: 3rem 1rem 0 1rem;
          font-weight: bold;
          color: ${colors.gold};
          @media (max-width: 320px) {
            font-size: 0.8rem;
          }
        `}
      >
        {question}
      </legend>
      {answers.map((key) => (
        <label
          key={key}
          htmlFor={key}
          css={css`
            display: flex;
            flex-direction: row;
            padding: 0.3rem;
            color: ${value === key ? colors.gold : "#fefefedd"};
            @media (max-width: 320px) {
              font-size: 0.8rem;
            }
          `}
        >
          <input
            id={key}
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
  (prevProps, nextProps) =>
    !nextProps.isPreview && prevProps.value === nextProps.value
);
