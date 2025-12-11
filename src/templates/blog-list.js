import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

export const query = graphql`
  query BlogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      skip: $skip
      limit: $limit
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

export default function BlogPage({ data, pageContext }) {
  const posts = data.allMarkdownRemark.nodes;
  const siteUrl = data.site.siteMetadata.siteUrl;
  const { currentPage, numPages } = pageContext;

  return (
    <Layout
      title="WealthHustle Articles — Finance Tips, Career Advice & Productivity Insights"
      description="Browse WealthHustle curated articles on smart investing, career growth, budgeting, and productivity."
      pageType="blog"
    >
      <section className="container mb-12">
        <h1 className="text-2xl font-bold mb-6">Blog list</h1>

        <div className="flex flex-col gap-6">
          {posts.map(post => (
            <article
              key={post.id}
              className="rounded-lg border border-gray-300 p-6 shadow-md bg-white"
              style={{ borderRadius: "12px", border: "2px solid #ccc" }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                <a
                  href={`${siteUrl}/${post.frontmatter.slug}/`}
                  className="text-blue-700 hover:text-blue-500 no-underline"
                >
                  {post.frontmatter.title}
                </a>
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                <em>{post.frontmatter.date}</em>
              </p>
              {post.frontmatter.description && (
                <p className="text-sm text-gray-700">{post.frontmatter.description}</p>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Pagination */}
      <nav className="flex justify-center gap-2 mt-8">
        {Array.from({ length: numPages }).map((_, i) => {
          const page = i + 1;
          const link = page === 1 ? `${siteUrl}/blog/` : `${siteUrl}/blog/${page}`;
          const isActive = page === currentPage;

          return (
            <a
              key={page}
              href={link}
              className={`px-3 py-1 rounded ${
                isActive
                  ? "bg-blue-600 text-white font-semibold"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {page}
            </a>
          );
        })}
      </nav>
    </Layout>
  );
}
