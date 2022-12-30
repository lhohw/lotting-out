import React, { useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { useRecoilState } from "recoil";
import { useColors } from "../recoil/theme";
import { modalState, ModalState } from "../recoil/modal";

export type ModalProps = {
  onClick: (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDialogElement>) => void;
};
const Modal = ({ onClick, onKeyDown }: ModalProps) => {
  const colors = useColors();
  const [state] = useRecoilState<ModalState>(modalState);
  const modal = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    if (state.isVisible) modal.current.focus();
  }, [state.isVisible]);
  return (
    <dialog
      open={state.isVisible}
      role="alertdialog"
      aria-modal="true"
      css={css`
        position: fixed;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        background-color: ${colors.dark + "aa"};
        display: ${state.isVisible ? "flex" : "none"};
        align-items: center;
        justify-content: center;
        flex-direction: column;
        opacity: 1;
        z-index: 100;
        padding: 0 1rem;
      `}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <div
        ref={modal}
        tabIndex={0}
        css={css`
          background-color: ${colors.dark};
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: min(320px, calc(100vw - 2rem));
          max-width: 500px;
          border: 1px solid ${colors.gold};
          border-radius: 8px;
          box-shadow: 1px 1px 2px ${colors.gold};
        `}
      >
        <h2
          css={css`
            color: ${colors.gold};
            margin: 1rem 0 0 0;
          `}
        >
          {state.title}
        </h2>
        <p
          css={css`
            padding: 1rem;
            word-break: break-all;
            color: ${colors.widgetBorder};
          `}
        >
          {state.content}
        </p>
        <menu
          css={css`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin: 1rem 0;
            padding: 0;
            & > button {
              border: 1px solid ${colors.gold};
              border-radius: 8px;
              padding: 0.5rem 1rem;
              font-weight: bold;
              font-size: 1.05rem;
              cursor: pointer;
              @media (max-width: 768px) {
                font-size: 0.8rem;
              }
            }
          `}
        >
          {(state.buttons || ["확인", "취소"]).map((buttonTitle, idx) => (
            <button
              key={buttonTitle}
              data-idx={idx}
              type="button"
              css={css`
                background-color: ${colors.dark};
                color: ${colors.gold};
                & + button {
                  margin-left: 1rem;
                }
              `}
              value={idx === 0 ? "agree" : "deny"}
            >
              {buttonTitle}
            </button>
          ))}
        </menu>
      </div>
    </dialog>
  );
};

export default Modal;
