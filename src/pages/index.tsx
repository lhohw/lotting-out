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
import RegisterButton from "../components/RegisterButton";

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
  const menu: CategoryMenu[] = data.allMdx.edges.map((edge) => {
    const { title, title_en, info } = edge.node.frontmatter;
    return { title, title_en, thumbnail: findImage(info) };
  });
  const {
    logo,
    slider: { images: imageInfos },
    apartment,
    short,
    ...rest
  } = data.settingJson;

  const prioritized: CategoryMenu[] = useMemo(
    () =>
      menu.filter(
        ({ title }) =>
          title === "사업개요" || title === "입지환경" || title === "상품안내"
      ),
    [menu]
  );
  const register: CategoryMenu[] = useMemo(
    () => menu.filter(({ title }) => title === "관심고객등록"),
    [menu]
  );
  const filtered: CategoryMenu[] = useMemo(
    () =>
      menu.filter(
        ({ title }) =>
          !(
            title === "사업개요" ||
            title === "입지환경" ||
            title === "상품안내" ||
            title === "관심고객등록"
          )
      ),
    [menu]
  );
  const sortedMenu = useMemo(
    () => [...prioritized, ...filtered, ...register],
    [prioritized, filtered, register]
  );
  return (
    <Layout>
      <HeaderContainer menu={sortedMenu} logo={logo} />
      <SliderContainer
        imageInfos={imageInfos}
        apartment={apartment}
        short={short}
      />
      <Category
        prioritized={prioritized}
        filtered={filtered}
        register={register}
        logo={logo}
      />
      <Footer apartment={apartment} {...rest} />
      <RegisterButton />
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
                      gatsbyImageData
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
                        gatsbyImageData
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
                    gatsbyImageData
                  }
                }
                alt
                title
              }
            }
            title
            title_en
          }
        }
      }
    }
    settingJson(type: { eq: "setting" }) {
      id
      logo {
        image {
          childImageSharp {
            gatsbyImageData
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
      declaration
      corporate
      apartment
      short
      address
      RN
    }
  }
`;

export const Head = () => <Seo title="Home Page" />;

export default IndexPage;
