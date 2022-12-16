import React from "react";
import {
  GatsbyImage,
  IGatsbyImageData,
  GatsbyImageProps,
} from "gatsby-plugin-image";
import { css, CSSObject, SerializedStyles } from "@emotion/react";

export type PreviewCompatibleImageProps = {
  imageInfo: {
    image:
      | string
      | {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
    alt: string;
    title: string;
    childImageSharp?: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
  style?: CSSObject;
  css?: SerializedStyles;
} & Omit<GatsbyImageProps, "alt" | "image">;

const PreviewCompatibleImage = ({
  imageInfo,
  ...props
}: PreviewCompatibleImageProps) => {
  const { image, alt = "", title = "", childImageSharp } = imageInfo;
  const cssStyle = css`
    width: 100%;
    height: 100%;
    object-fit: contain;
  `;
  if (!!image && typeof image !== "string" && !!image.childImageSharp) {
    return (
      <GatsbyImage
        css={cssStyle}
        {...props}
        image={image.childImageSharp.gatsbyImageData}
        alt={alt}
        title={title}
      />
    );
    // eslint-disable-next-line no-extra-boolean-cast
  } else if (!!childImageSharp) {
    return (
      <GatsbyImage
        css={cssStyle}
        {...props}
        image={childImageSharp.gatsbyImageData}
        alt={alt}
        title={title}
      />
    );
  } else if (image && typeof image === "string") {
    return <img src={image} css={cssStyle} alt={alt} title={title} />;
  }
  return null;
};

export default PreviewCompatibleImage;
