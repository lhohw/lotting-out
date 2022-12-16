import React, { PureComponent } from "react";
import { css } from "@emotion/react";
import { FaTimes } from "react-icons/fa";
import { InputControl } from "./Input";
import { ButtonControl } from "./Button";
import { SelectControl } from "./Select";
import { CategoryControlState } from "./Category";
import { ImagesControl } from "./Images";
import colors from "../constants/colors";
import { WidgetProps } from "./type";
import { MDXControl } from "./MDX";

export type SubInfoControlProps = {
  defaultKey: string;
  value: CategoryControlState;
  widgetProps: WidgetProps;
  onChange: <T>(value: T, key: string) => void;
  onRemove: (key: string) => void;
};

class SubInfoControl extends PureComponent<SubInfoControlProps> {
  constructor(props: SubInfoControlProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  shouldComponentUpdate(nextProps: Readonly<SubInfoControlProps>): boolean {
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
    onChange(
      (value || []).concat({
        type: "",
        title: "",
        images: [],
        markdown: "",
        sub: [],
      }),
      defaultKey
    );
  }
  render() {
    const { defaultKey, value, onChange, onRemove, widgetProps } = this.props;
    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
          border: 3px solid ${colors.main};
          padding: 0.5rem;
        `}
      >
        <ButtonControl target="Sub Info" onClick={this.onClick} />
        <div
          css={css`
            padding: 0.5rem;
          `}
        >
          {value.length
            ? value.map(({ type, title, images, sub, markdown }, idx) => (
                <div
                  key={idx}
                  css={css`
                    margin-top: 0.5rem;
                    border: 2px solid ${colors.sub};
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
                    `}
                    onClick={() => onRemove(`${defaultKey}|${idx}`)}
                  >
                    <FaTimes size={15} />
                  </span>
                  <InputControl
                    value={title || ""}
                    placeholder="제목"
                    name="title"
                    defaultKey={`${defaultKey}|${idx}`}
                    onChange={onChange}
                  />
                  <SelectControl
                    defaultKey={`${defaultKey}|${idx}`}
                    value={type}
                    onChange={onChange}
                  />
                  {type === "subInfo" ? (
                    <SubInfoControl
                      defaultKey={`${defaultKey}|${idx}|sub`}
                      value={sub}
                      widgetProps={widgetProps}
                      onChange={onChange}
                      onRemove={onRemove}
                    />
                  ) : type === "images" ? (
                    <ImagesControl
                      defaultKey={`${defaultKey}|${idx}|images`}
                      value={images}
                      widgetProps={widgetProps}
                      onChange={onChange}
                      onRemove={onRemove}
                    />
                  ) : type === "markdown" ? (
                    <MDXControl
                      defaultKey={`${defaultKey}|${idx}`}
                      value={markdown}
                      onChange={onChange}
                      widgetProps={widgetProps}
                    />
                  ) : null}
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }
}

export { SubInfoControl };
