const visit = require("unist-util-visit");

module.exports = ({ markdownAST }, pluginOptions) => {
  const { siteUrl } = pluginOptions;

  visit(markdownAST, "text", (node) => {
    node.value = node.value.replace(
      /{% link "(.*?)" "(.*?)" %}/g,
      (_, href, text) => `<a href="${new URL(href, siteUrl).href}">${text}</a>`
    );
  });

  return markdownAST;
};
