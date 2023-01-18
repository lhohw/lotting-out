import type { PreviewCompatibleImageData } from "../components/PreviewCompatibleImage";
import type { InfoProps } from "../components/Info";
import type { CategoryMenu } from "../components/Category";
import React, { useCallback, useMemo } from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import HeaderContainer from "../containers/HeaderContainer";
import SliderContainer from "../containers/SliderContainer";
import Category from "../components/Category";
import Footer, { FooterProps } from "../components/Footer";
import ControlButtonContainer from "../containers/ControlButtonContainer";
import Loading from "../components/Loading";

export type IndexPageData = {
  data: {
    allMdx: {
      edges: {
        node: {
          id: string;
          frontmatter: {
            title: string;
            title_en: string;
            info: InfoProps["data"][number];
            priority: number;
          };
        };
      }[];
    };
    settingJson: {
      id: string;
      slider: {
        images: PreviewCompatibleImageData[];
      };
      logo: PreviewCompatibleImageData;
      short: string;
      apartment: string;
    } & FooterProps;
  };
};
const IndexPage = ({ data }: IndexPageData) => {
  const findImage = useCallback(
    (info: InfoProps["data"][number]): PreviewCompatibleImageData["image"] => {
      if (info.type === "images") return info.images[0].image;
      if (info.type === "subInfo") {
        for (let i = 0; i < info.sub.length; i++) {
          const image = findImage(info.sub[i]);
          if (image) return image;
        }
      }
      return "";
    },
    []
  );
  const menu: CategoryMenu[] = useMemo(
    () =>
      data.allMdx.edges
        .map((edge) => {
          const { title, title_en, info, priority } = edge.node.frontmatter;
          return { title, title_en, thumbnail: findImage(info), priority };
        })
        .sort((a, b) => a.priority - b.priority),
    [data.allMdx.edges, findImage]
  );

  const {
    logo,
    slider: { images: imageInfos },
    apartment,
    short,
    ...rest
  } = data.settingJson;

  return (
    <Layout>
      <HeaderContainer menu={menu} logo={logo} />
      <SliderContainer
        imageInfos={imageInfos}
        apartment={apartment}
        short={short}
      />
      <Category menu={menu} logo={logo} />
      <Footer {...rest} />
      <ControlButtonContainer phoneNumber={rest.phoneNumber} />
      <Loading />
    </Layout>
  );
};

export const query = graphql`
  query settingAndMdx {
    allMdx(filter: { frontmatter: { templateKey: { eq: "category" } } }) {
      edges {
        node {
          id
          frontmatter {
            info {
              body
              sub {
                type
                title
                body
                images {
                  image {
                    childImageSharp {
                      gatsbyImageData(width: 350)
                    }
                  }
                  alt
                  title
                }
                sub {
                  type
                  title
                  body
                  images {
                    image {
                      childImageSharp {
                        gatsbyImageData(width: 350)
                      }
                    }
                    alt
                    title
                  }
                }
              }
              type
              images {
                image {
                  childImageSharp {
                    gatsbyImageData(width: 350)
                  }
                }
                alt
                title
              }
            }
            title
            title_en
            priority
          }
        }
      }
    }
    settingJson(type: { eq: "setting" }) {
      id
      logo {
        image {
          childImageSharp {
            gatsbyImageData(width: 100)
          }
        }
        alt
        title
      }
      phoneNumber
      slider {
        images {
          image {
            childImageSharp {
              gatsbyImageData
            }
          }
          alt
          title
        }
      }
      name
      email
      corporate
      apartment
      short
      address
    }
  }
`;

export const Head = () => (
  <>
    <link rel="dns-prefetch" href="https://t1.kakaocdn.net" />
    <Seo title="Home Page" />;
  </>
);

export default IndexPage;
