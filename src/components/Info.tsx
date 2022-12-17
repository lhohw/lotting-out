import React from "react";
import { css } from "@emotion/react";
import { Link } from "gatsby";

export type InfoProps = Record<
  "prioritized" | "filtered" | "register",
  {
    title: string;
    title_en: string;
  }[]
>;
const Info = ({ prioritized, filtered, register }: InfoProps) => {
  const gridStyle = css`
    display: grid;
    border: 1px solid black;
    padding: 1rem;
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
        font-size: 1.25rem;
        font-family: Song Myung;
        /* font-family: Nanum Gothic; */
      `}
    >
      {prioritized.length
        ? prioritized.map(({ title, title_en }) => (
            <Link
              key={title}
              to={`/info/${title_en}`}
              css={css`
                ${gridStyle}
                grid-column: span 3;
                grid-row: span 3;
              `}
            >
              {title}
            </Link>
          ))
        : null}
      {filtered.length ? (
        <div
          key={"filtered"}
          css={css`
            display: grid;
            grid-column: span 6;
            grid-row: span 3;
            grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
            grid-template-rows: repeat(auto-fit, auto);
          `}
        >
          {filtered.map(({ title, title_en }) => (
            <Link
              key={title_en}
              to={`/info/${title_en}`}
              css={css`
                ${gridStyle}
              `}
            >
              {title}
            </Link>
          ))}
        </div>
      ) : null}
      {register.length ? (
        <Link
          key={"register"}
          to={`/info/${register[0].title_en}`}
          css={css`
            ${gridStyle}
            grid-column: span 3;
            grid-row: span 3;
          `}
        >
          {register[0].title}
        </Link>
      ) : null}
    </div>
  );
};

export default React.memo(Info);
