import * as React from "react";
import { css } from "@emotion/react";

export type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        flex: 1;
        max-width: 1200px;
        margin: 0 auto;
      `}
    >
      <main>{children}</main>
    </div>
  );
};

export default Layout;
