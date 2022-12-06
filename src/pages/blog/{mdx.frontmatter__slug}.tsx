import * as React from "react";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import { graphql } from "gatsby";
import type { IGatsbyImageData, GatsbyImageProps } from "gatsby-plugin-image";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import useFrontmatter from "../../utils/hooks/useFrontmatter";

export type BlogPostProps = {
  data: {
    mdx: {
      frontmatter: {
        title: string;
        date: string;
        hero_image_alt: string;
        hero_image_credit_link: string;
        hero_image_credit_text: string;
        hero_image: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
      };
    };
  };
  children: React.ReactNode;
};
const BlogPost = ({ data, children }: BlogPostProps) => {
  const { hero_image, hero_image_alt } = useFrontmatter(data);

  const image = getImage(data.mdx.frontmatter.hero_image);
  return (
    <Layout>
      <p>{data.mdx.frontmatter.date}</p>
      {image && (
        <>
          <GatsbyImage
            image={image}
            alt={data.mdx.frontmatter.hero_image_alt}
          />
          <p>
            Photo Credit:{" "}
            <a href={data.mdx.frontmatter.hero_image_credit_link}>
              {data.mdx.frontmatter.hero_image_credit_text}
            </a>
          </p>
        </>
      )}
      {children}
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`;

export const Head = ({ data }: BlogPostProps) => (
  <Seo title={data.mdx.frontmatter.title} />
);

export default BlogPost;
