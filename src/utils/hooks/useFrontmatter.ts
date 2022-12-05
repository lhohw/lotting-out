const useFrontmatter = <T extends { mdx: { frontmatter: unknown } }>(
  data: T
): T["mdx"]["frontmatter"] => data?.mdx?.frontmatter;

export default useFrontmatter;
