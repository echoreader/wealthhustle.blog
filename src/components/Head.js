import React, { useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import generateSchema from "../utils/schema";

export default function Head({ title, description, pageType, slug, category, faqs }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);

  const location = useLocation();
  const canonicalUrl = `${site.siteMetadata.siteUrl}${location.pathname}`;
  const schema = generateSchema({
    pageType,
    title,
    description,
    slug,
    category,
    faqs
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.async = true;
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=pub-6771362188294710";
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  }, []);

  return (
    <Helmet>
      {/* 1. SEO meta */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* 2. Structured data */}
      {schema &&
        (Array.isArray(schema) ? (
          schema.map(
            (s, i) =>
              Object.keys(s).length > 0 && (
                <script key={i} type="application/ld+json">
                  {JSON.stringify(s)}
                </script>
              )
          )
        ) : (
          Object.keys(schema).length > 0 && (
            <script type="application/ld+json">
              {JSON.stringify(schema)}
            </script>
          )
        ))}

      {/* 3. Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />

      {/* 4. Cloudflare beacon script */}
      <script type="text/javascript">
        {`
          if (window.location.search.includes("no-track")) {
            localStorage.setItem("skipAnalytics", "true");
          }

          if (localStorage.getItem("skipAnalytics") !== "true") {
            const cfScript = document.createElement("script");
            cfScript.defer = true;
            cfScript.src = "https://static.cloudflareinsights.com/beacon.min.js";
            cfScript.setAttribute("data-cf-beacon", '{"token": "7409e335e20240efa07f1bd360e11f9f"}');
            document.head.appendChild(cfScript);
          }
        `}
      </script>
    </Helmet>
  );
}