import type { ImageProps, WidgetProps } from "./type";
import React, { PureComponent } from "react";
import { css } from "@emotion/react";
import { FaTimes } from "react-icons/fa";
import { ImageControl } from "./Image";
import { ButtonControl } from "./Button";
import colors from "../constants/colors";

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
    onChange<ImageProps[]>(
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
                  <span
                    css={css`
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      background-color: ${colors.background["light"]};
                      color: #c54141;
                      padding: 0.15rem;
                      position: absolute;
                      right: 0;
                      top: 0;
                      border-radius: 5px;
                      border: 1px solid #bdbdbd;
                      cursor: pointer;
                      z-index: 2;
                    `}
                    onClick={() => onRemove(`${defaultKey}|${idx}`)}
                  >
                    <FaTimes size={15} />
                  </span>
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
