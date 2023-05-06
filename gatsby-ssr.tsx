export { wrapRootElement, wrapPageElement } from "./gatsby-shared";

export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: `ko` });
};
