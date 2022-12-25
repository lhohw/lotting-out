import React, { PureComponent } from "react";
import { css } from "@emotion/react";

export type CategoryInputControlProps = {
  value: string;
  defaultKey: string;
  placeholder: string;
  name: string;
  className?: string;
  onChange: (value: string, key: string) => void;
};
class CategoryInputControl extends PureComponent<CategoryInputControlProps> {
  shouldComponentUpdate(nextProps: Readonly<CategoryInputControlProps>) {
    return this.props.value !== nextProps.value;
  }
  render() {
    const { value, defaultKey, onChange, placeholder, name, className } =
      this.props;
    return (
      <div
        className={className}
        css={css`
          display: flex;
          flex: 1;
          height: 3rem;
          margin: 0.5rem;
          border: 1px solid #dbdbdb;
          border-radius: 5px;
        `}
      >
        <input
          css={css`
            width: 100%;
            height: 100%;
            padding: 0.3rem;
          `}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value, `${defaultKey}|${name}`)}
        />
      </div>
    );
  }
}

export { CategoryInputControl };
