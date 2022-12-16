import type { RegisterState } from "../recoil/register";
import React from "react";
import { css } from "@emotion/react";
import { useColors } from "../recoil/theme/useTheme";
import Input from "./Input";
import Question from "./Question";

export type RegisterProps = {
  keys: {
    title: string;
    name: keyof RegisterState;
  }[];
  value: {
    [T in keyof RegisterState]: string;
  };
  onChange: (e: React.ChangeEvent<HTMLFormElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  questions: {
    title: string;
    name: string;
    keys: string[];
  }[];
};
const Register = ({
  keys,
  value,
  questions,
  onChange,
  onSubmit,
}: RegisterProps) => {
  const colors = useColors();
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        flex-direction: column;
        background-image: url("http://localhost:8000/static/c050f2edfec0ee9a6a8f36178d59f27c/97f6d/main2.webp");
      `}
    >
      <div
        css={css`
          display: flex;
          flex: 1;
          flex-direction: column;
          max-width: 500px;
          margin: 0 auto;
        `}
      >
        <h1
          css={css`
            color: ${colors.main};
            text-shadow: 1px 1px 3px ${colors.background};
            font-size: 2.2rem;
          `}
        >
          Find Out More
        </h1>
        <form
          css={css`
            display: flex;
            flex-direction: column;
            background-color: ${colors.background + "55"};
            border-radius: 8px;
            padding: 0.5rem;
            margin-bottom: 2rem;
          `}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e);
          }}
          onChange={onChange}
        >
          {keys.map(({ name, title }) => (
            <Input
              key={name}
              name={name}
              value={value[name]}
              placeholder={title}
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onChange={() => {}}
            />
          ))}
          {questions.map(({ title, keys, name }) => (
            <Question key={title} title={title} name={name} keys={keys} />
          ))}
          <button
            type="submit"
            css={css`
              margin-top: 1rem;
              padding: 0.8rem 0;
              font-size: 0.9rem;
              background-color: ${colors.background + "dd"};
              border-radius: 8px;
              border: 1px solid #dbdbdb;
              cursor: pointer;
            `}
          >
            제출
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
