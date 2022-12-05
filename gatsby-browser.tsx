import React from "react";
import { RecoilRoot } from "recoil";

import "./src/index.css";

export const wrapRootElement = ({ element }: { element: React.ReactNode }) => {
  return <RecoilRoot>{element}</RecoilRoot>;
};
