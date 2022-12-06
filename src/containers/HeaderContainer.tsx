import React from "react";
import Header from "../components/Header";
import { useStaticQuery, graphql } from "gatsby";
import { IGatsbyImageData, getImage } from "gatsby-plugin-image";

export type HeaderData = {
  settingJson: {
    menu: string[];
    logo: {
      logo_image: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      };
      logo_image_alt: string;
    };
  };
};
const HeaderContainer = () => {
  const data = useStaticQuery<HeaderData>(graphql`
    {
      settingJson {
        menu
        logo {
          logo_image {
            childImageSharp {
              gatsbyImageData
            }
          }
          logo_image_alt
        }
      }
    }
  `);
  const {
    menu,
    logo: { logo_image, logo_image_alt },
  } = data.settingJson;

  const logoImage = getImage(logo_image)!;
  return (
    <Header
      menu={menu}
      logo_image={logoImage}
      logo_image_alt={logo_image_alt}
    />
  );
};

export default React.memo(HeaderContainer);
