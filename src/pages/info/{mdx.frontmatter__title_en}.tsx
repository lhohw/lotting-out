import type { PreviewTemplateComponentProps } from "netlify-cms-core";
import * as React from "react";
import { css } from "@emotion/react";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import { graphql } from "gatsby";
import useFrontmatter from "../../utils/hooks/useFrontmatter";
import RegisterContainer from "../../containers/RegisterContainer";
import Info, { InfoProps } from "../../components/Info";

export type InfoPageProps = {
  data: {
    mdx: {
      frontmatter: {
        title: string;
        title_en: string;
        info: InfoProps["data"][number];
      };
    };
  };
  isPreview?: boolean;
  getAsset?: PreviewTemplateComponentProps["getAsset"];
};
const InfoPage = ({ data, isPreview, getAsset }: InfoPageProps) => {
  const { title, title_en, info } = useFrontmatter(data);
  return (
    <Layout>
      {title_en === "register" ? (
        <RegisterContainer backgroundImage={info?.sub[0]?.sub[0]?.images[0]} />
      ) : (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
          `}
        >
          <h1
            css={css`
              padding: 1rem 1rem 0 1rem;
              font-weight: bold;
            `}
          >
            {title}
          </h1>
          <Info
            data={info ? [info] : []}
            title_en={title_en}
            depth={0}
            isPreview={isPreview}
            getAsset={getAsset}
          />
        </div>
      )}
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        info {
          markdown
          sub {
            type
            title
            markdown
            images {
              image {
                childImageSharp {
                  gatsbyImageData
                }
              }
              alt
              title
            }
            sub {
              type
              title
              markdown
              images {
                image {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
                alt
                title
              }
            }
          }
          type
          images {
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
            alt
            title
          }
        }
        title
        title_en
      }
    }
  }
`;

export const Head = ({ data }: InfoPageProps) => (
  <Seo title={data.mdx.frontmatter.title} />
);

export default InfoPage;