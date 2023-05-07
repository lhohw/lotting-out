import type { RenderBodyArgs } from "gatsby";

import React from "react";

export { wrapRootElement, wrapPageElement } from "./gatsby-shared";

export const onRenderBody = ({
  setHtmlAttributes,
  setHeadComponents,
}: RenderBodyArgs) => {
  setHtmlAttributes({ lang: `ko` });

  if (
    process.env.NODE_ENV !== "production" &&
    process.env.NODE_ENV !== "test"
  ) {
    return null;
  }

  const origin = "https://wcs.naver.net/wcslog.js";
  setHeadComponents([
    <link rel="preconnect" key="preconnect-naver-analytics" href={origin} />,
    <link
      rel="dns-prefetch"
      key="dns-prefetch-naver-analytics"
      href={origin}
    />,
    <script key="naver-analytics" async type="text/javascript" src={origin} />,
    <script
      key="naver-analytics-config"
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `if(!window.wcs_add) wcs_add = {};
        wcs_add["wa"] = "${process.env.NA_ACCOUNT_ID}";
        if(window.wcs && window.wcs_do && typeof window.wcs_do === "function") {
          wcs_do();
        }`,
      }}
    />,
  ]);
};
