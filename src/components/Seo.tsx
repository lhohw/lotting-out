import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";

export type SeoProps = {
  title: string;
};
const Seo = ({ title }: SeoProps) => {
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
    <>
      <title>
        {title} | {data.site.siteMetadata.title}
      </title>
      <meta charSet="utf-8" />
      <meta lang="ko" />
    </>
  );
};

export default Seo;
