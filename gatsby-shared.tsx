import React from "react";
import { RecoilRoot } from "recoil";

import Layout from "./src/components/Layout";

export const wrapRootElement = ({ element }: { element: React.ReactNode }) => {
  return <RecoilRoot>{element}</RecoilRoot>;
};

export const wrapPageElement = ({ element }: { element: React.ReactNode }) => {
  return <Layout>{element}</Layout>;
};
