// lib/seo/index.ts
// Barrel export para SEO utilities

export {
  SITE_CONFIG,
  SEO_KEYWORDS,
  SOCIAL_LINKS,
  BUSINESS_INFO,
} from "./constants";
export {
  generateRootMetadata,
  generatePageMetadata,
  generateProductMetadata,
} from "./metadata";
export { generateViewportConfig } from "./viewport";
