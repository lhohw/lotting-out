import * as React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";

const AboutPage = () => {
  return (
    <Layout pageTitle="About">
      <p>
        Hi there! I'm the proud creator of this site, which I built with Gatsby.
      </p>
    </Layout>
  );
};

export const Head = () => <title>About Me</title>;

export default AboutPage;
