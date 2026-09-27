import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://xyntechx.com" },
    { url: "https://xyntechx.com/about" },
  ];
}
