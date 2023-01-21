import React from "react";
import { keyframes, css } from "@emotion/react";

import { degToRad } from "../utils";
import { useColors } from "../recoil/theme";
import { useRecoilState } from "recoil";
import { loadingState, LoadingState } from "../recoil/loading";

const opacityAnim = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0.1;
  }
`;

export type LoadingProps = {
  isLoading?: boolean;
};
const Loading = ({ isLoading: isLoadingProp = false }: LoadingProps) => {
  const [{ isLoading }] = useRecoilState<LoadingState>(loadingState);
  const colors = useColors();
  return (
    <React.Fragment>
      {isLoading || isLoadingProp ? (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-label="로딩중"
          css={css`
            position: fixed;
            width: 100vw;
            height: 100vh;
            top: 0;
            left: 0;
            background: ${colors.dark};
            opacity: 0.85;
            z-index: 101;
          `}
        >
          <div
            css={css`
              position: absolute;
              width: 120px;
              height: 120px;
              top: 50%;
              left: 50%;
              border-radius: 50%;
              transform: translate(-50%, -50%);
            `}
          >
            {new Array(12).fill(0).map((_, i) => (
              <div
                key={i}
                css={css`
                  width: 14px;
                  height: 26px;
                  position: absolute;
                  background-color: ${colors.gold};
                  border-radius: 50%;
                  opacity: 0.1;
                  top: ${60 - 47 * Math.cos(degToRad(30 * i)) + "px"};
                  left: ${60 + 47 * Math.sin(degToRad(30 * i)) + "px"};
                  transform: ${`translate(-50%, -50%) rotateZ(${i * 30}deg)`};
                  animation: ${opacityAnim} 1s ease-in ${i * (1 / 12)}s infinite;
                `}
              />
            ))}
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Loading;
