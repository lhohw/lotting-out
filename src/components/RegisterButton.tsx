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
      to="/info/register"
      className={className}
      css={css`
        display: flex;
        flex-direction: column;
        z-index: 3;
        border: 1px solid ${colors.gold};
        border-radius: 100%;
        box-shadow: 0px 0px 5px ${colors.gold};
        align-items: center;
        justify-content: center;
        width: 8rem;
        height: 8rem;
        position: fixed;
        right: 1rem;
        bottom: 3rem;
        background-color: ${colors.dark};
        font-family: "Cinzel", serif;
        font-weight: bolder;
        transition: all 0.4s ease-in-out;
        font-size: 1.2rem;
        color: ${colors.gold};
        filter: grayscale(100%);
        &:hover {
          filter: grayscale(0%);
          transform: scale(1.1);
        }
        @media (max-width: 992px) {
          width: 5rem;
          height: 5rem;
          font-size: 0.8rem;
          &:hover {
            width: 6rem;
            height: 6rem;
          }
        }
        @media (max-width: 500px) {
          width: 4rem;
          height: 4rem;
          font-size: 0.4rem;
          right: 0.5rem;
          bottom: 1rem;
          filter: grayscale(0%);
          &:hover {
            transform: none;
            filter: none;
            width: 4rem;
            height: 4rem;
          }
        }
      `}
    >
      <span>Register</span>
      <span
        css={css`
          font-size: 0.8rem;
          @media (max-width: 992px) {
            font-size: 0.7rem;
          }
          @media (max-width: 499px) {
            font-size: 0.4rem;
            font-family: -apple-system sans-serif;
          }
        `}
      >
        관심고객등록
      </span>
    </Link>
  );
};

export default RegisterButton;
