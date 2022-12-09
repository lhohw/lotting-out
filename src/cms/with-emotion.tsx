import React from "react";
import { CacheProvider } from "@emotion/react";
import createCache, { EmotionCache, Options } from "@emotion/cache";
import weakMemoize from "@emotion/weak-memoize";

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

export default (key: string, Component: React.FC) => (props: any) => {
  const iframe = document.querySelector("#nc-root iframe") as HTMLIFrameElement;
  const iframeHeadElem = iframe && iframe.contentDocument?.head;

  if (!iframeHeadElem) return null;
  return (
    <CacheProvider
      value={memoizedCreateCacheWithContainer({
        key,
        container: iframeHeadElem,
      })}
    >
      <Component {...props} />
    </CacheProvider>
  );
};
