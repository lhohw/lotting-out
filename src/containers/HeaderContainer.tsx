import type { PreviewCompatibleImageData } from "../components/PreviewCompatibleImage";
import React, { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import Header, { HeaderProps } from "../components/Header";
import { headerState, HeaderState } from "../recoil/header";
import produce from "immer";

export type HeaderData = {
  menu: {
    title: string;
    title_en: string;
  }[];
  logo: PreviewCompatibleImageData;
};
const HeaderContainer = ({ menu, logo }: HeaderData) => {
  const [state, setState] = useRecoilState<HeaderState>(headerState);
  const toggle = useCallback(() => {
    const nextState = produce(state, (draft) => {
      draft.isOpen = !draft.isOpen;
    });
    setState(nextState);
  }, [state, setState]);

  const hide = useCallback<() => void>(() => {
    if (state.isOpen) {
      const nextState = produce(state, (draft) => {
        draft.isOpen = false;
      });
      setState(nextState);
    }
  }, [state, setState]);

  const onKeyDown = useCallback<HeaderProps["onKeyDown"]>(
    (e) => {
      const target = e.target as HTMLElement;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (target.tagName === "UL") {
          const firstLink = target.firstChild?.firstChild as HTMLElement;
          if (firstLink && firstLink.tagName === "A") firstLink.focus();
        } else {
          const sibling = target.parentElement?.nextSibling
            ?.firstChild as HTMLElement;
          if (sibling) sibling.focus();
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (target.tagName === "UL") {
          const lastLink = target.lastChild?.firstChild as HTMLElement;
          if (lastLink && lastLink.tagName === "A") lastLink.focus();
        } else {
          const sibling = target.parentElement?.previousSibling
            ?.firstChild as HTMLElement;
          if (sibling) sibling.focus();
        }
      }
      if (!state.isOpen) return;
      if (
        e.key === "Escape" ||
        (e.key === "Tab" &&
          !e.shiftKey &&
          target.dataset.idx === (menu.length - 1).toString()) ||
        (e.key === "Tab" && e.shiftKey && target.dataset.idx === "0")
      )
        hide();
    },
    [hide, menu.length, state.isOpen]
  );

  const onFocus = useCallback<HeaderProps["onFocus"]>(() => {
    if (!state.isOpen) toggle();
  }, [state.isOpen, toggle]);

  const onBlur = useCallback<HeaderProps["onBlur"]>(
    (e) => {
      if (!state.isOpen) return;
      const target = e.target as HTMLElement;
      const relatedTarget = e.relatedTarget as HTMLElement;
      if (!target || !relatedTarget) return;
      if (target.tagName === "UL") {
        if (
          relatedTarget.tagName === "BUTTON" ||
          relatedTarget.tagName === "H1"
        ) {
          hide();
        }
      }
    },
    [state.isOpen, hide]
  );

  useEffect(() => {
    const close = () => {
      if (state.isOpen && window.innerWidth > 600) {
        setState({ ...state, isOpen: false });
      }
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const id = target.closest("button")?.id;
      if (id && id === "menu") toggle();
      else if (state.isOpen) {
        const ul = target.closest("ul");
        if (target.tagName === "H2" && ul) {
          ul.style.transition = "none";
          ul.style.width = "0";
          setState((state) => ({ ...state, isOpen: false }));
          ul.style.transition = "width 0.4s ease-in-out;";
          return;
        }
        setState((state) => ({ ...state, isOpen: false }));
      }
    };
    window.addEventListener("resize", close);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("resize", close);
      window.removeEventListener("click", onClick);
    };
  }, [setState, state, toggle]);
  return (
    <Header
      menu={menu}
      logo={logo}
      isOpen={state.isOpen}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

export default HeaderContainer;
