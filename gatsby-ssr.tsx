import type { RenderBodyArgs } from "gatsby";

import React from "react";
import { Partytown } from "@builder.io/partytown/react";

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
  setHeadComponents([
    <Partytown key="partytown" forward={["wcs_add", "wcs", "wcs_do"]} />,
    <script
      key="naver-analytics"
      type="text/partytown"
      src="http://wcs.naver.net/wcslog.js"
    />,
    <script
      key="naver-analytics-config"
      type="text/partytown"
      dangerouslySetInnerHTML={{
        __html: `
        if(!wcs_add) var wcs_add = {};
        wcs_add["wa"] = ${process.env.NA_ACCOUNT_ID};
        if(wcs) {
          wcs_do();
        }
        `,
      }}
    />,
  ]);
};
