import { allPosts } from "contentlayer/generated"
import siteMetadata from "../../data/sitemetadata";

export default async function sitemap() {
  const blogs = allPosts.filter((post) => post.draft === false).map(post => ({
    url: `${siteMetadata.siteUrl}${post.slug}`,
    lastModified: post.lastmod ? post.lastmod:post.publishDate,
  }))

  const routes = ['', '/blog','/about'].map(route => ({
    url: `${siteMetadata.siteUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}