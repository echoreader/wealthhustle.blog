import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

export default function CategoryPage({ data, pageContext }) {
  const posts = data.allMarkdownRemark.nodes;
  const { category } = pageContext;
  const siteUrl = data.site.siteMetadata.siteUrl;

  return (
    <Layout
      title={`Category: ${category}`}
      description={`Articles under ${category}`}
      pageType="category"
    >
      <section className="container">
        <h1 className="text-2xl font-bold mb-6">Category: {category}</h1>

        <div className="grid gap-y-6">
          {posts.map(post => (
            <div
              key={post.id}
              className="border border-solid border-gray-400 rounded-lg p-6 shadow-md space-y-4 bg-white mb-6"
              style={{ borderRadius: "12px", border: "2px solid #ccc" }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                <a href={`${siteUrl}/${post.frontmatter.slug}/`}>
                  {post.frontmatter.title}
                </a>
              </h2>

              <p className="text-sm text-gray-500 mb-2">
                <em>{post.frontmatter.date}</em>
              </p>

              <p className="text-gray-700">{post.frontmatter.description}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export const query = graphql`
  query CategoryQuery($category: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      nodes {
        id
        frontmatter {
          title
          description
          slug
          date(formatString: "MMMM D, YYYY")
        }
      }
    }
  }
`;
