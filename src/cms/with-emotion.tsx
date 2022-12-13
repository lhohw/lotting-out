import React from "react";
import { CacheProvider } from "@emotion/react";
import createCache, { EmotionCache, Options } from "@emotion/cache";
import weakMemoize from "@emotion/weak-memoize";
import type { PreviewTemplateComponentProps } from "netlify-cms-core";
import { RecoilRoot } from "recoil";

export type CacheProps = {
  key: string;
  container: React.ReactNode;
};
const memoizedCreateCacheWithContainer = weakMemoize<Options, EmotionCache>(
  (options) => {
    const { key, container } = options;
    const newCache = createCache({
      key,
      container,
    });
    return newCache;
  }
);

const WithEmotion =
  (key: string, Component: React.FC<PreviewTemplateComponentProps>) =>
  // eslint-disable-next-line react/display-name
  (props: PreviewTemplateComponentProps) => {
    const iframe = document.querySelector(
      "#nc-root iframe"
    ) as HTMLIFrameElement;
    const iframeHeadElem = iframe && iframe.contentDocument?.head;

    if (!iframeHeadElem) return null;
    return (
      <RecoilRoot>
        <CacheProvider
          value={memoizedCreateCacheWithContainer({
            key,
            container: iframeHeadElem,
          })}
        >
          <Component {...props} />
        </CacheProvider>
      </RecoilRoot>
    );
  };

export default WithEmotion;
