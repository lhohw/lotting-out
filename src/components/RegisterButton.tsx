import React from "react";
import { css } from "@emotion/react";
import { Link } from "gatsby";
import { useColors } from "../recoil/theme/useTheme";

export type RegisterButtonProps = {
  className?: string;
};
const RegisterButton = ({ className }: RegisterButtonProps) => {
  const colors = useColors();
  return (
    <Link
      to="/info/contact"
      className={className}
      css={css`
        display: flex;
        border: 1px solid ${colors.main};
        border-radius: 100%;
        box-shadow: 1px 3px 5px ${colors.text};
        align-items: center;
        justify-content: center;
        width: 8rem;
        height: 8rem;
        position: fixed;
        right: 1rem;
        bottom: 3rem;
        background-color: ${colors.background};
        font-family: "Cinzel", serif;
        color: ${colors.main};
        font-weight: bolder;
        transition: all 0.4s ease-in-out;
        font-size: 1.2rem;
        &:hover {
          width: 9rem;
          height: 9rem;
          right: 0.5rem;
          bottom: 2.5rem;
        }
        @media (max-width: 992px) {
          width: 5rem;
          height: 5rem;
          font-size: 0.9rem;
          &:hover {
            width: 6rem;
            height: 6rem;
          }
        }
      `}
    >
      <span>Register</span>
    </Link>
  );
};

export default RegisterButton;
