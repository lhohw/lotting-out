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
    name: string;
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
              <label
                key={name}
                css={css`
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  background-color: ${colors.dark + "dd"};
                  margin-top: 0.5rem;
                  border-radius: 8px;
                `}
              >
                <span
                  css={css`
                    /* padding: 0 1rem; */
                    text-align: center;
                    color: ${colors.gold + "dd"};
                    font-weight: bold;
                    width: 80px;
                  `}
                >
                  {title}
                </span>
                <Input
                  css={css`
                    height: 2rem;
                    background-color: ${colors.dark + "00"};
                    color: #fefefedd;
                    border-left: none;
                    border-top: none;
                    border-right: none;
                    border-radius: 0;
                    &:focus {
                      outline: none;
                    }
                  `}
                  key={name}
                  name={name}
                  value={value[name]}
                  placeholder={""}
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  onChange={() => {}}
                />
              </label>
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
                background-color: ${colors.dark + "dd"};
                color: #fefefedd;
                border-radius: 8px;
                border: 1px solid ${colors.widgetBorder};
                cursor: pointer;
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
