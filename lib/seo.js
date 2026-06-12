// Shared SEO helpers so every page emits complete Open Graph tags
// (og:image and og:type were missing on pages that defined their own openGraph).

export const ogImages = [
  {
    url: "https://www.patrickfire.com/og-image.png",
    width: 1200,
    height: 630,
    alt: "Patrick Environmental - Professional Fire Suppression Services",
  },
];

// Build a complete Open Graph object. Title/description are backfilled by
// Next.js from the page's metadata title/description when omitted here.
export function buildOpenGraph({ url, title, description } = {}) {
  return {
    type: "website",
    url,
    siteName: "Patrick Environmental",
    images: ogImages,
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
  };
}
