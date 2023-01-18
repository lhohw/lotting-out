import type { PreviewTemplateComponentProps } from "netlify-cms-core";
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import PreviewCompatibleImage, {
  PreviewCompatibleImageData,
} from "./PreviewCompatibleImage";

export type ImagesProps = {
  className?: string;
  images: PreviewCompatibleImageData[];
  title_en?: string;
  isPreview?: boolean;
  getAsset?: PreviewTemplateComponentProps["getAsset"];
};
const Images = ({
  className,
  images,
  title_en,
  isPreview,
  getAsset,
}: ImagesProps) => {
  const [imgs] = useState<PreviewCompatibleImageData[]>(
    images.map((image) => ({ ...image }))
  );
  const [appState, setAppState] = useState(false);
  useEffect(() => {
    (async () => {
      for (let i = 0; i < images.length; i++) {
        const image = imgs[i];
        if (typeof image.image === "string") {
          if (isPreview) image.image = getAsset!(image.image).url;
          else {
            try {
              image.image = (
                await import(
                  `../../contents/category/${title_en}/${image.image}`
                )
              ).default;
            } catch (e) {
              //
            }
          }
        }
      }
    })().then(() => {
      setAppState(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!appState) return null;
  return (
    <div
      className={className}
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      {imgs.map((imageInfo) => (
        <div
          key={imageInfo.title}
          css={css`
            display: flex;
            flex: 1;
            padding: 1rem;
            margin: 1rem auto;
          `}
        >
          <PreviewCompatibleImage
            css={css`
              max-width: 1200px;
              background-color: #fefefe;
            `}
            objectFit={"cover"}
            objectPosition={"center"}
            imageInfo={imageInfo}
          />
        </div>
      ))}
    </div>
  );
};

export default Images;
