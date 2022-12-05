import React, { useEffect } from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import HeaderContainer from "../containers/HeaderContainer";
import SliderContainer from "../containers/SliderContainer";

const IndexPage = () => {
  return (
    <Layout>
      <HeaderContainer />
      <SliderContainer />
    </Layout>
  );
};

export const Head = () => <Seo title="Home Page" />;

export default IndexPage;
