import type { PreviewTemplateComponentProps } from "netlify-cms-core";
import React from "react";
import Category from "../../pages/info/{mdx.frontmatter__title_en}";

const CategoryPreview = ({ entry }: PreviewTemplateComponentProps) => {
  const data = entry.getIn(["data"]).toJS();
  return (
    <Category
      data={{
        mdx: {
          frontmatter: {
            ...data,
          },
        },
      }}
    />
  );
};

export default CategoryPreview;
