import * as React from "react";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import { graphql, Link } from "gatsby";

export type BlogPageProps = {
  data: {
    allMdx: {
      nodes: {
        id: string;
        frontmatter: {
          date: string;
          title: string;
          slug: string;
        };
      }[];
    };
  };
};
const BlogPage = ({ data }: BlogPageProps) => {
  return (
    <Layout>
      {data.allMdx.nodes.map(
        (node: BlogPageProps["data"]["allMdx"]["nodes"][number]) => (
          <article key={node.id}>
            <h2>
              <Link to={`/blog/${node.frontmatter.slug}`}>
                {node.frontmatter.title}
              </Link>
            </h2>
            <p>Posted: {node.frontmatter.date}</p>
          </article>
        )
      )}
    </Layout>
  );
};

export const query = graphql`
  {
    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { slug: { ne: null } } }
    ) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          slug
        }
        id
      }
    }
  }
`;

export const Head = () => <Seo title="My Blog Posts" />;

export default BlogPage;
