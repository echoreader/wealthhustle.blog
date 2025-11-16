const isProd = process.env.NODE_ENV === "production"; // ← auto-detect environment

module.exports = {
  siteMetadata: {
    title: "Wealthhustle",
    description: "Modular. Reech. Powerful.",
    siteUrl: isProd
      ? "https://wealthhustle.blog"     // ← domain production
      : "http://localhost:8000",        // ← domain lokal saat dev
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    // `gatsby-plugin-sitemap`, // ← bisa aktifkan nanti kalau perlu

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/content/posts`,
      },
    },

    `gatsby-transformer-remark`,

    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [
          `https://fonts.googleapis.com`,
          `https://fonts.gstatic.com`,
        ],
        web: [
          {
            name: `Open Sans`,
            file: `https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap`,
          },
        ],
      },
    },
  ],
};
