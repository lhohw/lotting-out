import "@fontsource/nanum-gothic";
import "@fontsource/nanum-gothic/700.css";
import "@fontsource/song-myung";
import "./src/index.css";

export { wrapRootElement, wrapPageElement } from "./gatsby-shared";

export const onRouteUpdate = () => {
  if (process.env.NODE_ENV !== "production") return null;
  setTimeout(() => {
    const windowWithWcs = window as typeof window & {
      wcs?: unknown;
      wcs_do?: () => void;
    };
    if (windowWithWcs.wcs && typeof windowWithWcs.wcs_do === "function") {
      windowWithWcs.wcs_do();
    }
  }, 100);
};
