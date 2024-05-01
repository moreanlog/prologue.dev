import Rss from "rss";
import siteMetadata from "../../../data/sitemetadata";
import { allPosts } from "contentlayer/generated";
import { format } from "date-fns";

export async function GET() {
  const feed = new Rss({
    title: siteMetadata.title,
    description: siteMetadata.description,
    generator: "Node-RSS feed generator",
    feed_url: `${siteMetadata.siteUrl}/rss`,
    site_url: siteMetadata.siteUrl,
    image_url: `${siteMetadata.siteUrl}${siteMetadata.cover}`,
    docs: siteMetadata.siteUrl,
    language: siteMetadata.language,
    copyright: "CC BY-NC-SA 4.0",
    date: new Date(),
  });

  allPosts
    .filter((post) => post.draft === false)
    .forEach((post) => {
      feed.item({
        title: post.title,
        description: `<p>${post.description}</p> <hr> ${post.body.html} <hr> <a href=${siteMetadata.siteUrl}>${siteMetadata.title}</a> <p>${siteMetadata.description}</p>  <p>作者${siteMetadata.author}</p> <p>${format(new Date(post.publishDate), "yyyy MMMM do")}发布</p>`,
        author: siteMetadata.author,
        url: `${siteMetadata.siteUrl}${post.slug}`,
        guid: `${siteMetadata.siteUrl}${post.slug}`,
        date: post.publishDate,
        categories: post.tags,
      });
    });

  return new Response(feed.xml(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "private,must-revalidate,max-age=604800", // must revalidate, and must be cached by the client for 7 days
    },
  });
}
