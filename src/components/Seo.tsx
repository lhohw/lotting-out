import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";

export type SeoProps = {
  title: string;
};
export type SeoData = {
  settingJson: {
    apartment: string;
  };
};
const Seo = ({ title }: SeoProps) => {
  const data = useStaticQuery<SeoData>(graphql`
    {
      settingJson(type: { eq: "setting" }) {
        apartment
      }
    }
  `);
  const { apartment } = data.settingJson;
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
