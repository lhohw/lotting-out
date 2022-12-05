import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";

import useFrontmatter from "../utils/hooks/useFrontmatter";

export type SeoProps = {
  title: string;
};
export type SeoData = {
  mdx: {
    frontmatter: {
      apartment: string;
    };
  };
};
const Seo = ({ title }: SeoProps) => {
  const data = useStaticQuery(graphql`
    {
      mdx(frontmatter: { type: { eq: "setting" } }) {
        frontmatter {
          apartment
        }
      }
    }
  `);
  const { apartment } = useFrontmatter<SeoData>(data);
  return (
    <>
      <title>
        {apartment} | {title}
      </title>
      <meta charSet="utf-8" />
    </>
  );
};

export default Seo;
