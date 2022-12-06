import { wrapRootElement as wrapRootElement_browser } from "./gatsby-browser";

export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: `ko` });
};

export const wrapRootElement = wrapRootElement_browser;
