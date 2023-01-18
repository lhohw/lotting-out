import React, { useCallback, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { useRecoilState } from "recoil";
import { useColors } from "../recoil/theme";
import { modalState, ModalState } from "../recoil/modal";
import useModal from "../utils/hooks/useModal";

const Modal = () => {
  const colors = useColors();
  const [state] = useRecoilState<ModalState>(modalState);
  const modal = useRef<HTMLDivElement>(null!);
  const { hideModal } = useModal();

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "DIALOG" || target.tagName === "BUTTON") {
        hideModal();
      }
    },
    [hideModal]
  );
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDialogElement>) => {
      if (e.key === "Tab") {
        const target = e.target as HTMLElement;
        if (e.shiftKey && target.tagName === "DIV") {
          e.preventDefault();
          return;
        }
        if (
          !e.shiftKey &&
          target.tagName === "BUTTON" &&
          target.dataset.idx === (state.buttons!.length - 1).toString()
        ) {
          e.preventDefault();
          return;
        }
      } else if (e.key === "Escape") {
        hideModal();
      }
    },
    [hideModal, state.buttons]
  );
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
        width: 100%;
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
      `}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <div
        ref={modal}
        tabIndex={0}
        css={css`
          padding: 0 1rem;
          background-color: ${colors.dark};
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: min(320px, calc(100% - 2rem));
          max-width: 500px;
          border: 2px solid ${colors.gold};
          border-radius: 8px;
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
            display: flex;
            flex-direction: column;
            padding: 1rem;
            word-break: break-all;
            align-items: center;
            color: ${colors.widgetBorder};
            line-height: 1.7;
          `}
        >
          {state.content.split("\n").map((c, i) => (
            <span key={i}>{c}</span>
          ))}
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
          {state.buttons!.map(({ text, onClick }, idx) => (
            <button
              key={text}
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
              onClick={onClick}
            >
              {text}
            </button>
          ))}
        </menu>
      </div>
    </dialog>
  );
};

export default React.memo(Modal);
