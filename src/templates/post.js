import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Head from "../components/Head";

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
      }
    }
  }
`;

export default function PostTemplate({ data }) {
  const post = data.markdownRemark;
  const site = data.site; // ✅ ini yang kamu butuhkan

  if (!post) {
    return (
      <Layout>
        <p>Post not found.</p>
      </Layout>
    );
  }

  const { frontmatter, html } = post;

  return (
    <Layout>
      <Head
        title={frontmatter.title}
        description={frontmatter.description}
        pageType="post"
        slug={frontmatter.slug}
      />
      <article className="container">
        <h1>
          <a href={`${site.siteMetadata.siteUrl}/${frontmatter.slug}/`}
            aria-label={`Permalink to: ${frontmatter.title}`}
            className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {frontmatter.title}
          </a>
        </h1>
        <p><em>{frontmatter.date}</em></p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </Layout>
  );
}