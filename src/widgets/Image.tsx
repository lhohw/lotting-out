import React, { PureComponent } from "react";
import { css } from "@emotion/react";
import { CmsWidgetPreviewProps } from "netlify-cms-core";
import CMS from "netlify-cms-app";
import type { WidgetProps } from "./type";

export type ImageControlProps = {
  className?: string;
  onInfoChange: (value: string, key: string) => void;
  widgetProps: WidgetProps;
  defaultKey: string;
  value: {
    image: string;
    alt: string;
    title: string;
  };
};

class ImageControl extends PureComponent<ImageControlProps> {
  shouldComponentUpdate(nextProps: Readonly<ImageControlProps>): boolean {
    const {
      value,
      widgetProps: { classNameWrapper, hasActiveStyle, mediaPaths },
    } = this.props;
    return (
      value !== nextProps.value ||
      classNameWrapper !== nextProps.widgetProps.classNameWrapper ||
      hasActiveStyle !== nextProps.widgetProps.hasActiveStyle ||
      mediaPaths !== nextProps.widgetProps.mediaPaths
    );
  }
  render() {
    const ImageControl = CMS.getWidget("image")
      ?.control as unknown as React.FC<{
      value: string;
      onChange: (e: string) => void;
    }>;

    const {
      className,
      defaultKey,
      onInfoChange,
      widgetProps,
      value: { title, alt, image },
    } = this.props;
    if (!ImageControl) return <span>Image control not defined</span>;
    return (
      <div
        className={className}
        css={css`
          display: flex;
          flex-direction: row;
          border: 2px solid #dbdbdb;
          border-radius: 5px;
        `}
      >
        <div
          css={css`
            display: flex;
            flex: 1;
            flex-direction: column;
          `}
        >
          <ImageControl
            {...widgetProps}
            value={image}
            onChange={(e) => onInfoChange(e, `${defaultKey}|image`)}
          />
        </div>
        <ul
          css={css`
            display: flex;
            flex: 1;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            list-style: none;
          `}
        >
          <li
            css={css`
              display: flex;
              flex: 1;
              height: 3rem;
              max-height: 3rem;
              width: 100%;
            `}
          >
            <input
              css={css`
                display: flex;
                width: 100%;
                border-bottom: 2px solid #dbdbdb;
                margin: 0 1rem;
              `}
              value={alt}
              placeholder="대체 텍스트"
              onChange={(e) =>
                onInfoChange(e.target.value, `${defaultKey}|alt`)
              }
            />
          </li>
          <li
            css={css`
              display: flex;
              flex: 1;
              height: 3rem;
              max-height: 3rem;
              width: 100%;
              margin-top: 0.5rem;
            `}
          >
            <input
              css={css`
                display: flex;
                width: 100%;
                border-bottom: 2px solid #dbdbdb;
                margin: 0 1rem;
              `}
              value={title}
              placeholder="이미지 제목"
              onChange={(e) =>
                onInfoChange(e.target.value, `${defaultKey}|title`)
              }
            />
          </li>
        </ul>
      </div>
    );
  }
}

const ImagePreview = (props: CmsWidgetPreviewProps<string>) => {
  const { value, getAsset } = props;
  if (!value) return null;
  return (
    <div
      css={css`
        display: flex;
        flex: 1;
      `}
    >
      <img
        src={getAsset(value).url}
        css={css`
          width: 100%;
          height: 100%;
          object-fit: contain;
        `}
      />
    </div>
  );
};

export { ImageControl, ImagePreview };
