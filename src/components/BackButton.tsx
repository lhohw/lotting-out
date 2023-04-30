import React, { useCallback } from "react";
import { css } from "@emotion/react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useColors } from "../recoil/theme";
import { useRecoilState } from "recoil";
import { DeviceState, deviceState as ds } from "../recoil/deviceDetect";

export type BackButtonProps = {
  className?: string;
};
const BackButton = ({ className }: BackButtonProps) => {
  const [deviceState] = useRecoilState<DeviceState>(ds);
  const { isTouch, isInitialized } = deviceState;
  const onClick = useCallback(() => {
    history.back();
  }, []);
  const colors = useColors();
  return (
    <button
      type="button"
      className={className}
      title="뒤로 가기"
      aria-label="뒤로 가기"
      css={css`
        padding: 0;
        margin: 0;
        color: ${colors.text};
        border: none;
        background-color: transparent;
        cursor: pointer;
      `}
      onClick={onClick}
    >
      <IoArrowBackCircleOutline
        aria-hidden={true}
        css={css`
          width: 40px;
          height: 40px;
          transition: color 0.25s ease-in-out;
          @media (max-width: 500px) {
            width: 30px;
            height: 30px;
          }
          ${isInitialized &&
          !isTouch &&
          `
            &:hover {
              color: ${colors.main};
            } 
            `}
        `}
      />
    </button>
  );
};

export default BackButton;
