import React, { PureComponent } from "react";
import { css } from "@emotion/react";
import { CategoryInputControl } from "./CategoryInput";
import { ButtonControl } from "./Button";
import { SelectControl } from "./Select";
import { CategoryControlState } from "./Category";
import { ImagesControl } from "./Images";
import colors from "../constants/colors";
import { WidgetProps } from "./type";
import { MDXControl } from "./MDX";
import RemoveButton from "./RemoveButton";

export type SubInfoControlProps = {
  defaultKey: string;
  value: CategoryControlState;
  widgetProps: WidgetProps;
  depth?: number;
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
        body: "",
        sub: [],
      }),
      defaultKey
    );
  }
  render() {
    const {
      defaultKey,
      value,
      onChange,
      onRemove,
      widgetProps,
      depth = 0,
    } = this.props;
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
            ? value.map(({ type, title, images, sub, body }, idx) => (
                <div
                  key={idx}
                  css={css`
                    margin-top: 0.5rem;
                    border: 2px solid ${colors.sub};
                    position: relative;
                  `}
                >
                  <RemoveButton
                    size={15}
                    onClick={() => onRemove(`${defaultKey}|${idx}`)}
                  />
                  <CategoryInputControl
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
                    depth={depth + 1}
                  />
                  {type === "subInfo" ? (
                    <SubInfoControl
                      defaultKey={`${defaultKey}|${idx}|sub`}
                      value={sub}
                      widgetProps={widgetProps}
                      onChange={onChange}
                      onRemove={onRemove}
                      depth={depth + 1}
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
                      value={body}
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
