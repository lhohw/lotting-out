import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import Info from "../components/Info";

export type InfoData = {
  settingJson: {
    menu: string[];
  };
};
const InfoContainer = () => {
  const {
    settingJson: { menu },
  } = useStaticQuery<InfoData>(graphql`
    {
      settingJson {
        menu
      }
    }
  `);
  return <Info menu={menu} />;
};

export default InfoContainer;
