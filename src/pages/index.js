import * as React from "react";
import Layout from "../components/Layout";
import  { siteUrl } from "../utils/site";

export default function HomePage() {
  return (
    <Layout
      title="WealthHustle Blog — Smart Finance & Career Growth for Ambitious Professionals"
      description="Welcome to WealthHustle, your guide to financial empowerment and lifelong career success. Explore smart money strategies, market insights."
      pageType="home"
    >
      <section className="container">
        <h1>Grow Wealth, Craft Hustle — Smarter Moves Start Here</h1>
        <p>WealthHustle is your guide to financial clarity and career momentum. Explore smart investing, budgeting strategies, productivity tools, and lifelong learning insights designed for ambitious professionals who hustle with purpose.</p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Education */}
        <div
          className="border border-solid border-gray-400 rounded-lg p-6 shadow-md space-y-3 bg-white hover:shadow-lg transition"
          style={{ borderRadius: "12px", border: "2px solid #ccc" }}
        >
          <h3 className="text-xl font-semibold text-gray-900 leading-tight">
            <a
              href={`${siteUrl}/category/education/`}
              className="text-blue-700 no-underline focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Education
            </a>
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Articles on learning, teaching strategies, study methods, and personal development.
          </p>
        </div>

        {/* Finance */}
        <div
          className="border border-solid border-gray-400 rounded-lg p-6 shadow-md space-y-3 bg-white hover:shadow-lg transition"
          style={{ borderRadius: "12px", border: "2px solid #ccc" }}
        >
          <h3 className="text-xl font-semibold text-gray-900 leading-tight">
            <a
              href={`${siteUrl}/category/finance/`}
              className="text-blue-700 no-underline focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Finance
            </a>
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Insights on budgeting, investing, saving, and managing personal or business finances.
          </p>
        </div>

        {/* Business & Industrial */}
        <div
          className="border border-solid border-gray-400 rounded-lg p-6 shadow-md space-y-3 bg-white hover:shadow-lg transition"
          style={{ borderRadius: "12px", border: "2px solid #ccc" }}
        >
          <h3 className="text-xl font-semibold text-gray-900 leading-tight">
            <a
              href={`${siteUrl}/category/business-industrial/`}
              className="text-blue-700 no-underline focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Business & Industrial
            </a>
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Coverage of business operations, industry trends, entrepreneurship, and workplace insights.
          </p>
        </div>

      </div>

      {/* ✅ Blog Menu */}
      <div className="flex justify-center mt-10 mb-16">
        <a
          href={`${siteUrl}/blog/`}
          className="px-6 py-3 border border-gray-400 rounded-lg font-semibold bg-white hover:bg-gray-50 shadow-sm transition"
          style={{ borderRadius: "12px", border: "2px solid #ccc" }}
        >
          Explore All Blog Posts
        </a>
      </div>

    </Layout>
  );
}