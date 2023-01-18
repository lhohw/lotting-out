import React from "react";
import { css } from "@emotion/react";
import { useColors } from "../recoil/theme";

export type JumbotronProps = {
  title: string;
  content: string;
};

const Jumbotron = ({ title, content }: JumbotronProps) => {
  const colors = useColors();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        text-shadow: 1px 1px 3px ${colors.dark};
        z-index: 1;
        font-family: "Song Myung";
        font-display: swap;
      `}
    >
      <h1
        css={css`
          margin: 0;
          padding: 0;
          margin-bottom: 1rem;
          font-size: 3rem;
          color: ${colors.gold};
          @media (max-width: 600px) {
            font-size: 1.5rem;
          }
        `}
      >
        {title}
      </h1>
      <p
        css={css`
          margin: 0;
          padding: 0;
          margin-top: 1rem;
          color: #efefef;
          font-weight: bold;
          font-size: 1.5rem;
          @media (max-width: 600px) {
            font-size: 1rem;
          }
        `}
      >
        {content}
      </p>
    </div>
  );
};

export default React.memo(Jumbotron);
