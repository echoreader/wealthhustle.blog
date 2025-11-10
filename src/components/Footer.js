import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby"; // ← ditambah: ambil siteUrl

export default function Footer() {

  // ← ditambah: ambil siteUrl dari gatsby-config.js
    const { site } = useStaticQuery(graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `);
    const siteUrl = site.siteMetadata.siteUrl;

  return (
    <footer className="w-full bg-gray-100 text-purple-700 py-6 mt-12" role="contentinfo">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        {/* Kiri: Copyright */}
        <p className="text-sm">
          © 2025 Wealthhustle — All rights reserved.
        </p>

        {/* Kanan: Menu */}
        <div className="flex flex-col items-start md:items-end gap-2 text-sm">
          <a href={`${siteUrl}/contact/`} className="no-underline hover:text-purple-500">
            Contact
          </a>
          <a href={`${siteUrl}/disclaimer/`} className="no-underline hover:text-purple-500">
            Disclaimer
          </a>
          <a href={`${siteUrl}/privacy-policy/`} className="no-underline hover:text-purple-500">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>

  );
}
