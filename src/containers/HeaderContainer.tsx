import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

import Header from "../components/Header";
import { headerState, HeaderState } from "../recoil/header";
import type { PreviewCompatibleImageData } from "../components/PreviewCompatibleImage";

export type HeaderData = {
  menu: {
    title: string;
    title_en: string;
  }[];
  logo: PreviewCompatibleImageData;
};
const HeaderContainer = ({ menu, logo }: HeaderData) => {
  const [state, setState] = useRecoilState<HeaderState>(headerState);

  useEffect(() => {
    const close = () => {
      if (state.isOpen && window.innerWidth > 600) {
        setState({ ...state, isOpen: false });
      }
    };
    const closeByClick = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        const id = e.target.closest("svg")?.id;
        if (id && id === "menu")
          setState((state) => ({ ...state, isOpen: !state.isOpen }));
        else if (state.isOpen)
          setState((state) => ({ ...state, isOpen: false }));
      }
    };
    window.addEventListener("resize", close);
    window.addEventListener("click", closeByClick);
    return () => {
      window.removeEventListener("resize", close);
      window.removeEventListener("click", closeByClick);
    };
  }, [setState, state]);
  return <Header menu={menu} logo={logo} isOpen={state.isOpen} />;
};

export default React.memo(HeaderContainer);
