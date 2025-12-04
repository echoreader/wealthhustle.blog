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
      <section className="container">
        <h1 className="text-2xl font-bold mb-6">Blog</h1>
        <div className="grid gap-3">
          {posts.map(post => (
            <div
              key={post.id}
              className="border border-solid border-gray-400 rounded-lg p-6 shadow-sm space-y-4"
            > 
              <h2 className="text-lg font-semibold text-blue-700 mb-2">
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

      {/* === PAGINATION === */}
      <nav className="flex justify-center gap-2 mt-8">
        {/* tombol Prev */}
        {currentPage > 1 && (
          <a
            href={
              currentPage === 2
                ? `${siteUrl}/blog/`
                : `${siteUrl}/blog/${currentPage - 1}`
            }
            className="px-3 py-1 rounded bg-gray-100 text-gray-800 hover:bg-gray-200"
            rel="prev"
          >
            ← Prev
          </a>
        )}

        {/* nomor halaman */}
        {Array.from({ length: numPages }).map((_, i) => {
          const page = i + 1;
          const link =
            page === 1 ? `${siteUrl}/blog/` : `${siteUrl}/blog/${page}`;
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

        {/* tombol Next */}
        {currentPage < numPages && (
          <a
            href={`${siteUrl}/blog/${currentPage + 1}`}
            className="px-3 py-1 rounded bg-gray-100 text-gray-800 hover:bg-gray-200"
            rel="next"
          >
            Next →
          </a>
        )}
      </nav>
    </Layout>
  );
}
