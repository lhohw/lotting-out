import React from "react";
import {
  GatsbyImage,
  IGatsbyImageData,
  GatsbyImageProps,
} from "gatsby-plugin-image";
import { css } from "@emotion/react";

export type PreviewCompatibleImageData = {
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
export type PreviewCompatibleImageProps = {
  imageInfo: PreviewCompatibleImageData;
} & Omit<GatsbyImageProps, "alt" | "image">;

const PreviewCompatibleImage = ({
  imageInfo,
  ...props
}: PreviewCompatibleImageProps) => {
  const { image, alt = "", title = "", childImageSharp } = imageInfo;
  const cssStyle = css`
    width: 100%;
    height: 100%;
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
    return (
      <div className={props.className}>
        <img
          src={image}
          css={cssStyle}
          decoding={props.decoding || "async"}
          loading={props.loading || "lazy"}
          alt={alt}
          title={title}
        />
      </div>
    );
  }
  return null;
};

export default React.memo(
  PreviewCompatibleImage,
  (prevProps, nextProps) => prevProps.imageInfo === nextProps.imageInfo
);
