import React from "react";
import { css } from "@emotion/react";

export type QuestionProps = {
  title: string;
  keys: string[];
  name: string;
  className?: string;
};

const Question = ({ title, keys, name, className }: QuestionProps) => {
  return (
    <fieldset
      className={className}
      css={css`
        display: flex;
        flex-direction: column;
        margin-top: 0;
        border: none;
        background-color: #ffffffdd;
        border-radius: 10px;
      `}
    >
      <legend
        css={css`
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
          padding: 3rem 1rem 0 1rem;
          font-weight: bold;
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
          `}
        >
          <input
            css={css`
              margin-right: 1rem;
              cursor: pointer;
              margin-bottom: 0.11rem;
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

export default Question;
