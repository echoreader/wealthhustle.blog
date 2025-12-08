const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const SITE_URL = "https://wealthhustle.blog";
const POSTS_DIR = path.join(__dirname, "../src/content/posts");
const OUTPUT_PATH = path.join(__dirname, "../static/sitemap-category.xml");

console.log("📦 Generating sitemap-category.xml...");
console.log("📁 Reading from:", POSTS_DIR);
console.log("📤 Writing to:", OUTPUT_PATH);

try {
  if (!fs.existsSync(POSTS_DIR)) {
    throw new Error("❌ POSTS_DIR not found: " + POSTS_DIR);
  }

  const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith(".md"));

  if (files.length === 0) {
    console.warn("⚠️ No markdown files found in posts directory.");
  }

  // ✅ Kumpulkan kategori dari semua post
  const categorySet = new Set();

  files.forEach(file => {
    const content = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data } = matter(content);

    // ✅ Support BOTH: category (string) and categories (array)
    if (Array.isArray(data.categories)) {
      data.categories.forEach(cat => categorySet.add(cat));
    }

    if (typeof data.category === "string") {
      categorySet.add(data.category);
    }
  });

  // ✅ Convert Set → Array dan sort ascending
  const categories = [...categorySet].sort();

  const today = new Date().toISOString();

  const urls = categories.map(cat => {
    const slug = cat.toLowerCase().replace(/\s+/g, "-");

    return `
  <url>
    <loc>${SITE_URL}/category/${slug}/</loc>
    <lastmod>${today}</lastmod>
    <priority>0.6</priority>
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  fs.writeFileSync(OUTPUT_PATH, xml.trim());
  console.log("✅ sitemap-category.xml generated successfully.");
} catch (err) {
  console.error("❌ Sitemap generation failed:", err.message);
}
