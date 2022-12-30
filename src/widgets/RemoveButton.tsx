import React, { PureComponent } from "react";
import { css } from "@emotion/react";
import { FaTimes } from "react-icons/fa";
import colors from "../constants/colors";

export type RemoveButtonProps = {
  className?: string;
  size?: number;
  right?: number;
  top?: number;
  onClick: () => void;
};

class RemoveButton extends PureComponent<RemoveButtonProps> {
  render() {
    const { className, size = 20, onClick, right = 0, top = 0 } = this.props;
    return (
      <button
        className={className}
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: ${colors.background["light"]};
          color: ${colors.red};
          padding: 0.15rem;
          margin: 0;
          position: absolute;
          border-radius: 5px;
          border: 1px solid ${colors.widgetBorder};
          cursor: pointer;
          right: ${right}px;
          top: ${top}px;
        `}
        onClick={onClick}
      >
        <FaTimes size={size} />
      </button>
    );
  }
}

export default RemoveButton;
