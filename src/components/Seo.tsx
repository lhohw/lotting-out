import type { PreviewCompatibleImageData } from "./PreviewCompatibleImage";
import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";

export type SeoProps = {
  title: string;
};
export type SeoData = {
  settingJson: {
    apartment: string;
    short: string;
    logo: {
      image: PreviewCompatibleImageData;
    };
    keywords: {
      list: string[];
    };
  };
  site: {
    siteMetadata: {
      siteUrl: string;
    };
  };
  allMdx: {
    edges: {
      node: {
        frontmatter: {
          title: string;
          title_en: string;
        };
      };
    }[];
  };
};
const Seo = ({ title }: SeoProps) => {
  const data = useStaticQuery<SeoData>(graphql`
    {
      settingJson(type: { eq: "setting" }) {
        apartment
        short
        logo {
          image {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        keywords {
          list
        }
      }
      site {
        siteMetadata {
          siteUrl
        }
      }
      allMdx(filter: { frontmatter: { templateKey: { eq: "category" } } }) {
        edges {
          node {
            frontmatter {
              title
              title_en
            }
          }
        }
      }
    }
  `);
  const { settingJson, site, allMdx } = data;
  const {
    apartment,
    logo,
    short,
    keywords: { list },
  } = settingJson;
  const {
    siteMetadata: { siteUrl },
  } = site;
  const menu = React.useMemo(
    () => allMdx.edges.map((edge) => edge.node.frontmatter.title).join(", "),
    [allMdx]
  );
  return (
    <>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, viewport-fit=cover, initial-scale=1.0, minimum-scale=0, maximum-scale=10, user-scalable=yes"
      ></meta>
      <meta name="title" content={`${apartment} - 집이 라이프를 바꾸는 순간`} />
      <meta
        name="description"
        content={`${apartment} 총 809세대 대단지 블록형 단독주택, ${menu} 등 여러 카테고리에서 정보를 확인하세요.`}
      />
      <meta name="keywords" content={list.join(" ")} />
      <meta name="theme-color" content="#c6aa94" />
      <meta name="color-scheme" content="dark light" />
      <meta
        name="og:title"
        content={`${apartment} - 집이 라이프를 바꾸는 순간`}
      />
      <meta
        name="og:description"
        content={`${apartment} ${short}, ${menu} 등 여러 카테고리에서 정보를 확인하세요.`}
      />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:locale" content="ko-KR" />
      <meta
        property="og:image"
        content={
          logo?.image?.childImageSharp?.gatsbyImageData?.images?.fallback
            ?.src || ""
        }
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="627" />
      {/* <meta name="naver-site-verification" content="" /> */}
      <title>
        {apartment} | {title}
      </title>
      {/* <script
        type="text/javascript"
        async
        src="https://www.google-analytics.com/analytics.js"
      ></script> */}
    </>
  );
};

export default Seo;
