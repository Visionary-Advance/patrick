export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://patrickfire.com/sitemap.xml",
  };
}
