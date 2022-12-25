import type { PreviewTemplateComponentProps } from "netlify-cms-core";
import React from "react";
import Footer from "../../components/Footer";
import HeaderContainer from "../../containers/HeaderContainer";
import SliderContainer from "../../containers/SliderContainer";
import { List as ListPreview } from "../../widgets/List";

const GeneralPreview = ({ entry, getAsset }: PreviewTemplateComponentProps) => {
  const {
    logo: { image, alt, title },
    slider: { images: imageInfos },
    apartment,
    short,
    keywords,
    ...rest
  } = entry.getIn(["data"]).toJS();
  return (
    <div>
      <HeaderContainer
        logo={{
          image: getAsset(image).url,
          alt,
          title,
        }}
        menu={[
          {
            title: "사업개요",
            title_en: "overview",
          },
          {
            title: "입지환경",
            title_en: "environment",
          },
          {
            title: "상품안내",
            title_en: "product",
          },
          {
            title: "프리미엄",
            title_en: "premium",
          },
          {
            title: "관심고객등록",
            title_en: "register",
          },
        ]}
      />
      <SliderContainer
        apartment={apartment}
        short={short}
        imageInfos={(
          imageInfos as {
            image: string;
            alt: string;
            title: string;
          }[]
        ).map(({ image, alt, title }) => ({
          image: getAsset(image).url,
          alt,
          title,
        }))}
      />
      <Footer apartment={apartment} {...rest} />
      <ListPreview list={keywords?.list || []} />
    </div>
  );
};

export default GeneralPreview;
