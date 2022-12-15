import React, { PureComponent } from "react";
import { css } from "@emotion/react";
import { FaTimes } from "react-icons/fa";
import { InputControl } from "./Input";
import { ButtonControl } from "./Button";
import { SelectControl } from "./Select";
import { CategoryControlState } from "./Category";
import colors from "../constants/colors";

export type SubInfoControlProps = {
  defaultKey: string;
  value: CategoryControlState;
  onChange: (value: any, key: string) => void;
  onRemove: (key: string) => void;
};

class SubInfoControl extends PureComponent<SubInfoControlProps> {
  constructor(props: SubInfoControlProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  shouldComponentUpdate(nextProps: Readonly<SubInfoControlProps>): boolean {
    const { value } = this.props;
    return value !== nextProps.value;
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
    const { defaultKey, value, onChange, onRemove } = this.props;
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
            ? value.map(({ type, title, images, markdown, sub }, idx) => (
                <div
                  key={idx}
                  css={css`
                    margin-top: 0.5rem;
                    border: 1px solid #dbdbdb;
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
                      onChange={onChange}
                      onRemove={onRemove}
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
