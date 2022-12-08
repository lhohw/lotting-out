import React from "react";
import { css } from "@emotion/react";

export type InfoProps = {
  menu: string[];
};
const Info = ({ menu }: InfoProps) => {
  const prioritized: string[] = [];
  let register = "";
  const filtered = menu.filter((title) => {
    if (title === "사업개요" || title === "입지환경" || title === "상품안내") {
      prioritized.push(title);
      return false;
    }
    if (title === "관심고객등록") {
      register = title;
      return false;
    }
    return true;
  });
  for (let i = 0; i < 2; i++) filtered.push(`item${i}`);
  const gridStyle = css`
    display: grid;
    border: 1px solid black;
    align-items: center;
    justify-content: center;
    margin: 0.3rem;
    cursor: pointer;
  `;
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(9, 1fr);
        grid-auto-rows: 8vw;
        margin: 2rem 1rem;
        grid-auto-flow: row;
        justify-content: end;
      `}
    >
      {prioritized.map((title) => (
        <div
          key={title}
          css={css`
            ${gridStyle}
            grid-column: span 3;
            grid-row: span 3;
          `}
        >
          {title}
        </div>
      ))}
      {filtered.length && (
        <div
          key={"filtered"}
          css={css`
            display: grid;
            grid-column: span 6;
            grid-row: span 3;
            grid-template-columns: repeat(auto-fit, minmax(50%, auto));
            grid-template-rows: repeat(auto-fit, auto);
          `}
        >
          {filtered.map((title) => (
            <div
              key={title}
              css={css`
                ${gridStyle}
              `}
            >
              {title}
            </div>
          ))}
        </div>
      )}
      {register && (
        <div
          key={register}
          css={css`
            ${gridStyle}
            grid-column: span 3;
            grid-row: span 3;
          `}
        >
          {register}
        </div>
      )}
    </div>
  );
};

export default React.memo(Info);
