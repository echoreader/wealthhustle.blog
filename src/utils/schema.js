export default function generateSchema({ pageType, title, description, slug, category, faqs }) {
  const baseUrl = "https://wealthhustle.blog";

  switch (pageType) {
    case "home":
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Echo Reader",
        url: baseUrl,
        description,
        logo: `${baseUrl}/favicon.png`,
        sameAs: [
          "https://github.com/echoreader",
          "https://twitter.com/echoreader"
        ],
      };

    case "post":
      const article = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url: `${baseUrl}/${slug}`,
        author: {
          "@type": "Person",
          name: "Echo",
        },
        publisher: {
          "@type": "Organization",
          name: "EchoReader",
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/favicon.png`,
          },
        },
        datePublished: new Date().toISOString(),
      };

      const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: category || "Blog",
            item: `${baseUrl}/blog/`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: `${baseUrl}/${slug}`,
          },
        ],
      };

      const faqSchema = faqs && faqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(faq => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      } : null;

      return [article, breadcrumb, faqSchema].filter(Boolean);

    case "about":
      return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Echo Reader",
        url: `${baseUrl}/about`,
        description,
        sameAs: [
          "https://github.com/echoreader",
          "https://twitter.com/echoreader"
        ],
      };

    default:
      return {};
  }
}
