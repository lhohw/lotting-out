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
            title: "목록1",
            title_en: "overview",
          },
          {
            title: "목록2",
            title_en: "environment",
          },
          {
            title: "목록3",
            title_en: "product",
          },
          {
            title: "목록4",
            title_en: "premium",
          },
          {
            title: "목록5",
            title_en: "register",
          },
        ]}
      />
      <SliderContainer
        isPreview
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
