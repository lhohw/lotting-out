import React, { ChangeEvent } from "react";
import { css } from "@emotion/react";
import { useColors } from "../recoil/theme/useTheme";

export type InputProps = {
  value: string;
  placeholder: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};
const Input = ({
  value,
  onChange,
  placeholder,
  name,
  className,
}: InputProps) => {
  const colors = useColors();
  return (
    <input
      css={css`
        display: flex;
        flex: 1;
        height: 4rem;
        margin: 0.5rem;
        padding: 0.5rem;
        font-size: 1.05rem;
        border: 1px solid ${colors.widgetBorder};
        border-radius: 5px;
        background-color: ${colors.background};
        color: ${colors.text};
      `}
      className={className}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
