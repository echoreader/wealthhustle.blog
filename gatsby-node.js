const path = require("path");

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const slug = node.frontmatter.slug ||
      path.basename(node.fileAbsolutePath, ".md");

    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        nodes {
          frontmatter { slug }
        }
        edges {
          node {
            frontmatter { slug title }
          }
          next {
            frontmatter { slug title }
          }
          previous {
            frontmatter { slug title }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  // === PAGINATION ===
  const posts = result.data.allMarkdownRemark.nodes;
  const postsPerPage = 10;
  const numPages = Math.ceil(posts.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog/` : `/blog/${i + 1}`,
      component: path.resolve("./src/templates/blog-list.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  // === DETAIL POST (NEXT/PREV) ===
  result.data.allMarkdownRemark.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: `/${node.frontmatter.slug}/`,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        slug: node.frontmatter.slug,
        previous,
        next,
      },
    });
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }
    type Frontmatter {
      title: String
      description: String
      slug: String
      date: Date @dateformat
    }
    type Fields {
      slug: String
    }
  `);
};