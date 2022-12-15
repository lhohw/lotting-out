import React, { PureComponent } from "react";
import { css } from "@emotion/react";
import colors from "../constants/colors";

export type ButtonControlProps = {
  target: string;
  onClick: () => void;
};

class ButtonControl extends PureComponent<ButtonControlProps> {
  render() {
    const { target, onClick } = this.props;
    return (
      <button
        css={css`
          border: 1px solid #dbdbdb;
          padding: 0.5rem 1rem;
          background-color: ${colors.background};
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
