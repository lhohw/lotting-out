import * as React from "react";
import { Link } from "gatsby";
import { css } from "@emotion/react";
import { useStaticQuery, graphql } from "gatsby";

export type LayoutProps = {
  pageTitle: string;
  children: React.ReactNode;
};
const Layout = ({ pageTitle, children }: LayoutProps) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        flex: 1;
        max-width: 1000px;
        margin: 2rem auto;
      `}
    >
      <header
        css={css`
          font-size: 2rem;
          font-weight: bold;
        `}
      >
        {data.site.siteMetadata.title}
      </header>
      <nav>
        <ul
          css={css`
            display: flex;
            list-style: none;
            margin: 1rem;
            padding: 0;
            & > li {
              margin-left: 1rem;
            }
          `}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
        </ul>
      </nav>
      <main>
        <h1>{pageTitle}</h1>
        {children}
      </main>
    </div>
  );
};

export default Layout;
