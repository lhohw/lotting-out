import React, { ChangeEvent } from "react";
import { css } from "@emotion/react";

export type InputProps = {
  value: string;
  placeholder: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
const Input = ({ value, onChange, placeholder, name }: InputProps) => {
  return (
    <input
      css={css`
        display: flex;
        flex: 1;
        height: 4rem;
        margin: 0.5rem;
        padding: 0.5rem;
        font-size: 1.05rem;
        border: 1px solid #bdbdbd;
        border-radius: 5px;
      `}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
