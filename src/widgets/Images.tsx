import type { ImageProps, WidgetProps } from "./type";
import React, { PureComponent } from "react";
import { css } from "@emotion/react";
import { ImageControl } from "./Image";
import { ButtonControl } from "./Button";
import RemoveButton from "./RemoveButton";

export type ImagesControlProps = {
  defaultKey: string;
  value: ImageProps[];
  widgetProps: WidgetProps;
  onChange: <T>(value: T, key: string) => void;
  onRemove: (key: string) => void;
};
class ImagesControl extends PureComponent<ImagesControlProps> {
  constructor(props: ImagesControlProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  shouldComponentUpdate(nextProps: Readonly<ImagesControlProps>): boolean {
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
  onClick() {
    const { onChange, defaultKey, value } = this.props;
    onChange<ImagesControlProps["value"]>(
      (value || []).concat({
        image: "",
        alt: "",
        title: "",
      }),
      defaultKey
    );
  }
  render() {
    const { value, defaultKey, widgetProps, onChange, onRemove } = this.props;
    const { onClick } = this;
    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <ButtonControl target="image" onClick={onClick} />
        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
          `}
        >
          {value.length
            ? value.map((v, idx) => (
                <div
                  key={idx}
                  css={css`
                    display: grid;
                    position: relative;
                  `}
                >
                  <RemoveButton
                    css={css`
                      z-index: 2;
                    `}
                    size={15}
                    onClick={() => onRemove(`${defaultKey}|${idx}`)}
                  />
                  <ImageControl
                    value={v}
                    defaultKey={`${defaultKey}|${idx}`}
                    widgetProps={widgetProps}
                    onInfoChange={onChange}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }
}

export { ImagesControl };
