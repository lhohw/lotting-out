import React, { useEffect, useState, useCallback } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { IGatsbyImageData, getImage } from "gatsby-plugin-image";
import { useRecoilState } from "recoil";
import { sliderState } from "../recoil/slider";
import type { SliderState } from "../recoil/slider/atom";

import useFrontmatter from "../utils/hooks/useFrontmatter";
import Slider from "../components/Slider";

export type SliderData = {
  mdx: {
    frontmatter: {
      images: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      }[];
      alts: string[];
    };
  };
};
const SliderContainer = () => {
  const [state, setState] = useRecoilState<SliderState>(sliderState);

  const data = useStaticQuery<SliderData>(graphql`
    {
      mdx(frontmatter: { type: { eq: "slider" } }) {
        frontmatter {
          images {
            childImageSharp {
              gatsbyImageData
            }
          }
          alts
        }
      }
    }
  `);

  const { images: imgs, alts } = useFrontmatter<SliderData>(data);
  const images = imgs.map((img) => getImage(img)!);

  const handleIndex = useCallback((idx: number) => {
    setState({ ...state, idx: Math.min(Math.max(0, idx), images.length - 1) });
  }, []);
  return (
    <Slider
      idx={state.idx}
      images={images}
      alts={alts}
      handleIndex={handleIndex}
    />
  );
};

export default SliderContainer;
