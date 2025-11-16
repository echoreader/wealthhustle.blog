import * as React from "react";
import Layout from "../components/Layout";

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
    </Layout>
  );
}