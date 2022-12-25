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
        /* max-width: 1200px; */
        margin: 0 auto;
        padding-left: env(safe-area-inset-left);
        padding-right: env(safe-area-inset-right);
        padding-bottom: env(safe-area-inset-bottom);
        padding-top: env(safe-area-inset-top);
      `}
    >
      <main>{children}</main>
    </div>
  );
};

export default Layout;
