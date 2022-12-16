import type { PreviewTemplateComponentProps } from "netlify-cms-core";
import React from "react";
import { useRecoilState } from "recoil";

import Header from "../../components/Header";
import { headerState, HeaderState } from "../../recoil/header";

const HeaderPreview = ({ entry, getAsset }: PreviewTemplateComponentProps) => {
  const data = entry.getIn(["data"]).toJS();
  const {
    logo: { image, alt, title },
  } = data;
  const [state] = useRecoilState<HeaderState>(headerState);
  return (
    <Header
      logo={{
        image: getAsset(image).url,
        alt,
        title,
      }}
      menu={["사업개요", "입지환경", "상품안내", "프리미엄", "관심고객등록"]}
      isOpen={state.isOpen}
    />
  );
};

export default HeaderPreview;
