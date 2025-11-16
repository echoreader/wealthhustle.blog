import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";

export const query = graphql`
  {
    site {
      siteMetadata {
        siteUrl
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          title
          description
          slug
          date(formatString: "MMMM D, YYYY")
        }
        id
      }
    }
  }
`;

export default function BlogPage({ data }) {
  const posts = data.allMarkdownRemark.nodes;
  const siteUrl = data.site.siteMetadata.siteUrl;

  return (
    <Layout
      title="WealthHustle Articles — Finance Tips, Career Advice & Productivity Insights"
      description="Browse WealthHustle curated articles on smart investing, career growth, budgeting, and productivity."
      pageType="blog"
    >
      <section className="container">
        <h1>Blog</h1>
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <h2>
              <Link to={`${siteUrl}/${post.frontmatter.slug}`}>
                {post.frontmatter.title}
              </Link>
            </h2>
            <p><em>{post.frontmatter.date}</em></p>
            <p>{post.frontmatter.description}</p>
          </div>
        ))}
      </section>
    </Layout>
  );
}