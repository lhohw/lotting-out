import React, { useCallback } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { useRecoilState } from "recoil";
import { sliderState } from "../recoil/slider";
import type { SliderState } from "../recoil/slider/atom";

import useFrontmatter from "../utils/hooks/useFrontmatter";
import Slider from "../components/Slider";

export type SliderData = {
  mdx: {
    frontmatter: {
      imageInfos: {
        image: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
        alt: string;
      }[];
    };
  };
};
const SliderContainer = () => {
  const [state, setState] = useRecoilState<SliderState>(sliderState);

  const data = useStaticQuery<SliderData>(graphql`
    {
      mdx(frontmatter: { templateKey: { eq: "slider" } }) {
        frontmatter {
          imageInfos {
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
            alt
          }
        }
      }
    }
  `);

  const { imageInfos } = useFrontmatter<SliderData>(data);

  const handleIndex = useCallback(
    (idx: number) => {
      setState({
        ...state,
        idx: Math.min(Math.max(0, idx), imageInfos.length - 1),
      });
    },
    [imageInfos.length, setState, state]
  );

  return (
    <Slider idx={state.idx} imageInfos={imageInfos} handleIndex={handleIndex} />
  );
};

export default SliderContainer;
