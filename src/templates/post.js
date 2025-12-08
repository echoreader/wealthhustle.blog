import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Head from "../components/Head";
import { extractFaqs } from "../utils/extractFaqs";

export const query = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        slug
        date(formatString: "MMMM D, YYYY")
        author
        category
        tags
      }
    }
  }
`;

export default function PostTemplate({ data, pageContext }) {
  const post = data.markdownRemark;
  const site = data.site;
  const { previous, next } = pageContext;

  if (!post) {
    return (
      <Layout>
        <p>Post not found.</p>
      </Layout>
    );
  }

  const { frontmatter, html } = post;
  const faqs = extractFaqs(html);

  return (
    <Layout>
      <Head
        title={frontmatter.title}
        description={frontmatter.description}
        pageType="post"
        slug={frontmatter.slug}
        category={frontmatter.category}
        faqs={faqs}
      />

      <nav className="text-sm text-gray-600 mb-4 px-4">
        <a href="/" className="hover:underline">Home</a>
        {frontmatter.category && (
          <>
            &nbsp;&gt;&nbsp;
            <a
              href={`/category/${frontmatter.category}/`}
              className="text-gray-800 hover:underline"
            >
              {frontmatter.category}
            </a>
          </>
        )}
        &nbsp;&gt;&nbsp;
        <span className="text-gray-800 font-semibold">{frontmatter.title}</span>
      </nav>

      <article className="container">
        <h1>
          <a
            href={`${site.siteMetadata.siteUrl}/${frontmatter.slug}/`}
            aria-label={`Permalink to: ${frontmatter.title}`}
            className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {frontmatter.title}
          </a>
        </h1>
        <p className="text-sm text-gray-700 px-4">
          <em>{frontmatter.date}</em> • {frontmatter.author || "Echo Reader"}
        </p>

        <div dangerouslySetInnerHTML={{ __html: html }} />

        {/* === TAGS === */}
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="mt-8 text-sm text-gray-600 px-4 flex items-center flex-wrap gap-x-3 gap-y-2">
            <strong className="mr-2">Tags:</strong>
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-200 transition"
                >
                  {tag}
                </span>
              ))}
          </div>
        )}
      </article>

      {/* === NEXT / PREVIOUS === */}
      <nav className="flex justify-between mt-12 px-4 text-sm text-blue-600">
        {previous && (
          <div className="flex items-center">
            <span className="mr-2">←</span>
            <a
              href={`${site.siteMetadata.siteUrl}/${previous.frontmatter.slug}/`}
              rel="prev"
              className="hover:underline"
            >
              {previous.frontmatter.title}
            </a>
          </div>
        )}
        {next && (
          <div className="flex items-center">
            <a
              href={`${site.siteMetadata.siteUrl}/${next.frontmatter.slug}/`}
              rel="next"
              className="hover:underline"
            >
              {next.frontmatter.title}
            </a>
            <span className="ml-2">→</span>
          </div>
        )}
      </nav>
    </Layout>
  );
}