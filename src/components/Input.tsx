import React, { ChangeEvent } from "react";
import { css } from "@emotion/react";
import { useColors } from "../recoil/theme/useTheme";

export type InputProps = {
  title: string;
  value: string;
  placeholder: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};
const Input = ({
  title,
  value,
  onChange,
  placeholder,
  name,
  className,
}: InputProps) => {
  const colors = useColors();
  return (
    <label
      htmlFor={title}
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: ${colors.dark + "dd"};
        margin-top: 0.5rem;
        border-radius: 8px;
        @media (max-width: 320px) {
          font-size: 0.8rem;
        }
      `}
    >
      <span
        css={css`
          /* padding: 0 1rem; */
          text-align: center;
          color: ${colors.gold};
          font-weight: bold;
          width: 80px;
        `}
      >
        {title}
      </span>
      <input
        id={title}
        css={css`
          display: flex;
          flex: 1;
          height: 4rem;
          margin: 0.5rem;
          padding: 0.5rem;
          font-size: 1.05rem;
          height: 2rem;
          background-color: ${colors.dark + "00"};
          color: #fefefedd;
          border-left: none;
          border-top: none;
          border-right: none;
          border-radius: 0;
          transition: border-color 0.3s ease-in-out;
          &:focus {
            outline: none;
            border-color: ${colors.gold};
            border-bottom-width: 2px;
          }
        `}
        autoComplete={"off"}
        className={className}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default React.memo(
  Input,
  (prevProps, nextProps) => prevProps.value === nextProps.value
);
