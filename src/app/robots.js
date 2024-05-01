import siteMetadata from "../../data/sitemetadata";

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/tags/',
      ],
    },
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
  };
}