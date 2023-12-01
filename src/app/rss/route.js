import Rss from "rss";
import siteMetadata from "../../../data/sitemetadata";
import { allPosts } from "contentlayer/generated"


export async function GET() {

  const feed = new Rss({
    title: siteMetadata.title,
    description: siteMetadata.description,
    generator: 'Node-RSS feed generator',
    feed_url: `${siteMetadata.siteUrl}/rss`,
    site_url: siteMetadata.siteUrl,
    image_url: `${siteMetadata.siteUrl}${siteMetadata.cover}`,
    docs: siteMetadata.siteUrl,
    language: siteMetadata.language,
    copyright:'CC BY-NC-SA 4.0'
  });

  allPosts.filter((post) => post.draft === false).forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      author: siteMetadata.author,
      url: `${siteMetadata.siteUrl}${post.slug}`,
      guid: `${siteMetadata.siteUrl}${post.slug}`,
      date: post.pubDate,
      categories:post.tags,
    });
  });

  return new Response(feed.xml(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}