import React, { useState } from "react";
import { Link, useStaticQuery, graphql } from "gatsby"; // ← ditambah: ambil siteUrl
import "../styles/global.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
    <header className="w-full bg-gray-100" role="banner">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Branding */}
        <div className="text-purple-700 font-bold text-xl">
          <Link to={`${siteUrl}/`} itemProp="url" className="no-underline">
            Wealthhustle
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1 w-8 h-8"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="block w-full h-0.5 bg-purple-700"></span>
          <span className="block w-full h-0.5 bg-purple-700"></span>
        </button>

        {/* Menu */}
        <nav
          className={`flex-col md:flex md:flex-row md:gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent transition-all ${
            menuOpen ? "flex" : "hidden"
          }`}
          role="menubar"
        >
          <Link
            to={`${siteUrl}/blog/`}
            className="text-purple-700 hover:text-purple-500 no-underline"
            role="menuitem"
          >
            Blog
          </Link>
          <Link
            to={`${siteUrl}/about/`}
            className="text-purple-700 hover:text-purple-500 no-underline"
            role="menuitem"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
