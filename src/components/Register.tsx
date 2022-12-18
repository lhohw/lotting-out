import type { RegisterState } from "../recoil/register";
import React from "react";
import { css } from "@emotion/react";
import { useColors } from "../recoil/theme/useTheme";
import Input from "./Input";
import Question from "./Question";
import PreviewCompatibleImage, {
  PreviewCompatibleImageData,
} from "./PreviewCompatibleImage";

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
  backgroundImage: PreviewCompatibleImageData;
  questions: {
    title: string;
    name: keyof RegisterState;
    keys: string[];
  }[];
};
const Register = ({
  keys,
  value,
  questions,
  backgroundImage,
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
        position: relative;
      `}
    >
      <PreviewCompatibleImage
        css={css`
          position: absolute;
        `}
        imageInfo={backgroundImage}
      />
      <div
        css={css`
          display: flex;
          flex: 1;
          flex-direction: column;
          width: 100%;
          z-index: 1;
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
              text-shadow: 1px 1px 3px ${colors.gold};
              font-size: 2.2rem;
              margin-left: 1.5rem;
            `}
          >
            Find Out More
          </h1>
          <form
            css={css`
              display: flex;
              flex-direction: column;
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
                title={title}
                name={name}
                value={value[name]}
                placeholder={""}
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                onChange={() => {}}
              />
            ))}
            {questions.map(({ title, keys, name }) => (
              <Question
                key={title}
                value={value[name]}
                title={title}
                name={name}
                keys={keys}
              />
            ))}
            <button
              type="submit"
              css={css`
                margin-top: 1rem;
                padding: 0.8rem 0;
                font-size: 0.9rem;
                background-color: ${colors.dark + "dd"};
                color: #fefefedd;
                border-radius: 8px;
                border: 2px solid ${colors.widgetBorder};
                transition: all 0.3s ease-in-out;
                cursor: pointer;
                &:hover {
                  color: ${colors.gold};
                  border-color: ${colors.gold};
                  font-weight: bold;
                }
              `}
            >
              제출
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
