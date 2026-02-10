import { servicesData } from "@/lib/servicesData";
import { memorialData } from "@/lib/memorialData";

export default function sitemap() {
  const baseUrl = "https://patrickfire.com";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wildfires`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/wildfires/map`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/memorial`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/employment`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/submit-experience`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  // Dynamic service pages
  const servicePages = servicesData.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic memorial pages
  const memorialPages = memorialData.map((memorial) => ({
    url: `${baseUrl}/memorial/${memorial.id}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticPages, ...servicePages, ...memorialPages];
}
