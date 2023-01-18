import React from "react";
import { RecoilRoot } from "recoil";

import "@fontsource/nanum-gothic";
import "@fontsource/nanum-gothic/700.css";
import "@fontsource/song-myung";
import "./src/index.css";

export const wrapRootElement = ({ element }: { element: React.ReactNode }) => {
  return <RecoilRoot>{element}</RecoilRoot>;
};
