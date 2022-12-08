import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import HeaderContainer from "../containers/HeaderContainer";
import SliderContainer from "../containers/SliderContainer";
import InfoContainer from "../containers/InfoContainer";

const IndexPage = () => {
  return (
    <Layout>
      <HeaderContainer />
      <SliderContainer />
      <InfoContainer />
    </Layout>
  );
};

export const Head = () => <Seo title="Home Page" />;

export default IndexPage;
