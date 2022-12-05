import React from "react";
import Header from "../components/Header";
import { useStaticQuery, graphql } from "gatsby";
import { IGatsbyImageData, getImage } from "gatsby-plugin-image";
import useFrontmatter from "../utils/hooks/useFrontmatter";

export type HeaderData = {
  mdx: {
    frontmatter: {
      apartment: string;
      date: string;
      menu: string[];
      logo_image_alt: string;
      logo_image: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      };
    };
  };
};
const HeaderContainer = () => {
  const data = useStaticQuery<HeaderData>(graphql`
    {
      mdx(frontmatter: { type: { eq: "setting" } }) {
        frontmatter {
          apartment
          menu
          logo_image_alt
          logo_image {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  `);
  const { menu, logo_image, logo_image_alt } = useFrontmatter<HeaderData>(data);
  const logoImage = getImage(logo_image)!;
  return (
    <Header
      menu={menu}
      logo_image={logoImage}
      logo_image_alt={logo_image_alt}
    />
  );
};

export default HeaderContainer;
