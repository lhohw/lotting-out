import type { PreviewTemplateComponentProps } from "netlify-cms-core";
import React from "react";
import { useRecoilState } from "recoil";

import Header from "../../components/Header";
import { headerState } from "../../recoil/header";
import { HeaderState } from "../../recoil/header/atom";

const HeaderPreview = ({ entry, getAsset }: PreviewTemplateComponentProps) => {
  const data = entry.getIn(["data"]).toJS();
  const logo_image = getAsset(data.logo.logo_image).url;
  const logo_image_alt = data.logo.logo_image_alt;
  const menu = data.menu;
  const [state] = useRecoilState<HeaderState>(headerState);
  return (
    <Header
      logo_image={logo_image}
      logo_image_alt={logo_image_alt}
      menu={menu}
      isOpen={state.isOpen}
    />
  );
};

export default HeaderPreview;
