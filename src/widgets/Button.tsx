import React, { PureComponent } from "react";
import { css } from "@emotion/react";
import colors from "../constants/colors";

export type ButtonControlProps = {
  className?: string;
  target: string;
  onClick: () => void;
};

class ButtonControl extends PureComponent<ButtonControlProps> {
  render() {
    const { target, onClick, className } = this.props;
    return (
      <button
        className={className}
        css={css`
          border: 1px solid #dbdbdb;
          padding: 0.5rem 1rem;
          background-color: ${colors.background["light"]};
          cursor: pointer;
        `}
        onClick={onClick}
      >
        {`+ ${target}`}
      </button>
    );
  }
}

export { ButtonControl };
