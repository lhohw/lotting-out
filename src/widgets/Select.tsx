import React, { PureComponent } from "react";
import { css } from "@emotion/react";
import colors from "../constants/colors";

export type SelectControlProps = {
  value: string;
  defaultKey: string;
  onChange: (value: string, key: string) => void;
};

class SelectControl extends PureComponent<SelectControlProps> {
  shouldComponentUpdate(nextProps: Readonly<SelectControlProps>): boolean {
    return this.props.value !== nextProps.value;
  }
  render() {
    const { value, defaultKey, onChange } = this.props;
    return (
      <ul
        css={css`
          display: flex;
          flex-direction: row;
        `}
      >
        {[
          ["subInfo", "하위 정보"],
          ["images", "이미지"],
          ["markdown", "마크다운"],
        ].map(([key, title]) => (
          <li
            key={key}
            css={css`
              display: flex;
              flex: 1;
              margin: 0 1rem;
              padding: 0.5rem;
              height: 100%;
              cursor: pointer;
              color: ${value === key
                ? colors.background["light"]
                : colors.text["light"]};
              align-items: center;
              justify-content: center;
              border-radius: 8px;
              background-color: ${value === key
                ? colors.sub
                : colors.background["light"]};
              transition: background-color 0.3s ease-in-out,
                color 0.7s ease-in-out;
              border: 1px solid #dbdbdb;
            `}
            onClick={() => {
              onChange(key, `${defaultKey}|type`);
            }}
          >
            {title}
          </li>
        ))}
      </ul>
    );
  }
}

export { SelectControl };
