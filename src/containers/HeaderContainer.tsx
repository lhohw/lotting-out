import React, { useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { useRecoilState } from "recoil";

import Header from "../components/Header";
import { headerState } from "../recoil/header";
import { HeaderState } from "../recoil/header/atom";

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
  const [state, setState] = useRecoilState<HeaderState>(headerState);

  useEffect(() => {
    const close = () => {
      if (state.isOpen && window.innerWidth > 600) {
        setState({ ...state, isOpen: false });
      }
    };
    const closeByClick = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        const id = e.target.closest("svg")?.id;
        if (id && id === "menu")
          setState((state) => ({ ...state, isOpen: !state.isOpen }));
        else if (state.isOpen)
          setState((state) => ({ ...state, isOpen: false }));
      }
    };
    window.addEventListener("resize", close);
    window.addEventListener("click", closeByClick);
    return () => {
      window.removeEventListener("resize", close);
      window.removeEventListener("click", closeByClick);
    };
  }, [setState, state]);
  return (
    <Header
      menu={menu}
      logo_image={logo_image}
      logo_image_alt={logo_image_alt}
      isOpen={state.isOpen}
    />
  );
};

export default React.memo(HeaderContainer);
