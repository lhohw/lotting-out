import type { PreviewTemplateComponentProps } from "netlify-cms-core";
import type { RegisterProps } from "../../components/Register";
import React from "react";
import { css } from "@emotion/react";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import { graphql } from "gatsby";
import useFrontmatter from "../../utils/hooks/useFrontmatter";
import RegisterContainer from "../../containers/RegisterContainer";
import Info, { InfoProps } from "../../components/Info";
import BackButton from "../../components/BackButton";
import { useColors } from "../../recoil/theme";
import Loading from "../../components/Loading";

export type InfoPageProps = {
  data: {
    mdx: {
      frontmatter: {
        title: string;
        title_en: string;
        info: InfoProps["data"][number];
      };
    };
    settingJson: {
      questions: {
        questions: RegisterProps["questions"];
      };
      info: RegisterProps["info"];
    };
  };
  isPreview?: boolean;
  getAsset?: PreviewTemplateComponentProps["getAsset"];
};
const InfoPage = ({ data, isPreview, getAsset }: InfoPageProps) => {
  const colors = useColors();
  const { mdx, settingJson } = data;
  const { title, title_en, info } = useFrontmatter({ mdx });
  const { questions, info: questionInfo } = settingJson;
  return (
    <Layout>
      <BackButton
        css={css`
          position: absolute;
          left: 1.5rem;
          top: 1.5rem;
          z-index: 3;
          color: ${title === "관심고객등록" ? colors.dark : "inherit"};
          @media (max-width: 500px) {
            left: 1rem;
            top: 1rem;
          }
        `}
      />
      {title_en === "register" ? (
        <RegisterContainer questions={questions} info={questionInfo} />
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
              @media (max-width: 499px) {
                margin: 1rem 0 0 0;
              }
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
      <Loading />
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        info {
          body
          sub {
            type
            title
            body
            images {
              image {
                childImageSharp {
                  gatsbyImageData(width: 1200)
                }
              }
              alt
              title
            }
            sub {
              type
              title
              body
              images {
                image {
                  childImageSharp {
                    gatsbyImageData(width: 1200)
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
                gatsbyImageData(width: 1200)
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
    settingJson(type: { eq: "questions" }) {
      questions {
        questions {
          question
          answers
        }
      }
      info {
        name
        title
      }
    }
  }
`;

export const Head = ({ data }: InfoPageProps) => (
  <Seo title={data.mdx.frontmatter.title} />
);

export default InfoPage;
