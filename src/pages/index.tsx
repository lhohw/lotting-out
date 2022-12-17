import type { PreviewCompatibleImageData } from "../components/PreviewCompatibleImage";
import React from "react";
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
    } & FooterProps;
  };
};
export type MenuTitle = {
  title: string;
  title_en: string;
};
const IndexPage = ({ data }: IndexPageData) => {
  const menu = data.allMdx.edges.map((edge) => edge.node.frontmatter);
  const {
    logo,
    slider: { images: imageInfos },
    ...rest
  } = data.settingJson;

  const prioritized: MenuTitle[] = [];
  const register: MenuTitle[] = [];
  const filtered = menu.filter(({ title, title_en }) => {
    if (title === "사업개요" || title === "입지환경" || title === "상품안내") {
      prioritized.push({ title, title_en });
      return false;
    }
    if (title === "관심고객등록") {
      register.push({
        title,
        title_en,
      });
      return false;
    }
    return true;
  });
  const sortedMenu = [...prioritized, ...filtered].concat(register);
  return (
    <Layout>
      <HeaderContainer menu={sortedMenu} logo={logo} />
      <SliderContainer imageInfos={imageInfos} />
      <Category
        prioritized={prioritized}
        filtered={filtered}
        register={register}
      />
      <Footer {...rest} />
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
            title
            title_en
          }
        }
      }
    }
    settingJson {
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
      address
      RN
    }
  }
`;

export const Head = () => <Seo title="Home Page" />;

export default IndexPage;
