import React from "react";
import type { SerializedStyles } from "@emotion/react";

export type HTMLContentProps = {
  content: React.ReactNode;
  css: SerializedStyles;
};
export const HTMLContent = ({ content, css }: HTMLContentProps) => (
  // @ts-ignore
  <div css={css} dangerouslySetInnerHTML={{ __html: content }} />
);

const Content = ({ content, css }: HTMLContentProps) => (
  <div css={css}>{content}</div>
);

export default Content;
