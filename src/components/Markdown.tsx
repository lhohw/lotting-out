import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { micromark } from "micromark";
import { useColors } from "../recoil/theme";

export type MarkdownProps = {
  className?: string;
  title_en: string;
  content: string;
};

const Markdown = ({ content, title_en, className }: MarkdownProps) => {
  const colors = useColors();
  const [markdown, setMarkdown] = useState("");
  useEffect(() => {
    let tmp = micromark(
      content
        .split("\n")
        .map((row) => row.trim())
        .join("\n")
    );
    const imageRegex =
      // eslint-disable-next-line no-useless-escape
      /src="([가-힣a-zA-Zㄱ-ㅎ.?!@#$%^&(),*-=_+\[\]\\;:'/0-9`~₩ ]*)"/g;
    const images = [];
    let target = imageRegex.exec(tmp);
    while (target) {
      const src = target[1];
      const { index } = target;
      images.push({ src, index, len: src.length });
      target = imageRegex.exec(tmp);
    }
    (async () => {
      for (let i = 0; i < images.length; i++) {
        const { src: s } = images[i];
        const src = (await import(`../../contents/category/${title_en}/${s}`))
          .default;

        images[i].src = src;
      }
      for (let i = images.length - 1; i >= 0; i--) {
        const { len, index, src } = images[i];
        tmp = tmp.slice(0, index + 5) + src + tmp.slice(index + 5 + len);
      }
    })().then(() => {
      setMarkdown(tmp);
    });
  }, [markdown, setMarkdown, content, title_en]);
  return (
    <div
      className={className}
      css={css`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 1rem 2rem;
        max-width: 800px;
        min-width: min(800px, 100vw);
        font-size: 1.05rem;
        & > ul {
          padding: 0.5rem;
          margin-left: 1rem;
          li {
            list-style: decimal;
          }
        }
        & > ol {
          padding: 0.5rem;
          margin-left: 1rem;
          li {
            list-style: circle;
          }
        }
        & > p > a {
          transition: color 0.25s ease-in-out;
          color: ${colors.main};
          &:hover {
            color: ${colors.gold};
          }
        }
        & > p > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}
      dangerouslySetInnerHTML={{ __html: markdown }}
    ></div>
  );
};

export default Markdown;
