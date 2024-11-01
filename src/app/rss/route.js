import { Feed } from "feed";
import siteMetadata from "../../../data/sitemetadata";
import { allPosts } from "contentlayer/generated";
import { format } from "date-fns";
import { compareDesc } from "date-fns";

export async function GET() {
  const feed = new Feed({
    title: siteMetadata.title,
    description: `${siteMetadata.description}`,
    id: `${siteMetadata.siteUrl}`,
    link: `${siteMetadata.siteUrl}`,
    favicon: `${siteMetadata.siteUrl}${siteMetadata.favicon}`,
    language: siteMetadata.language,
    copyright: "CC BY-NC-SA 4.0",
    updated: new Date(),
    image: `${siteMetadata.siteUrl}${siteMetadata.favicon}`,
    generator: "Feed",
    feedLinks: {
      json: `${siteMetadata.siteUrl}/rss`,
    },
    author: {
      name: "槐序",
      email: "hello@prologue.dev",
      link: `${siteMetadata.siteUrl}/about`,
    },
  });
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.publishDate), new Date(b.publishDate));
  })
  posts
    .filter((post) => post.draft === false)
    .forEach((post) => {
      feed.addItem({
        title: post.title,
        description: post.description,
        content: `<p>${post.description}</p> <hr> ${post.body.html} <hr> <a href=${siteMetadata.siteUrl}>${siteMetadata.title}</a> <p>${siteMetadata.description}</p>  <p>作者${siteMetadata.author}</p> <p>${format(new Date(post.publishDate), "yyyy MMMM do")}发布</p>`,
        author: {
          name: "槐序",
          email: "hello@prologue.dev",
          link: `${siteMetadata.siteUrl}/about`,
        },
        id: `${siteMetadata.siteUrl}${post.slug}`,
        link: `${siteMetadata.siteUrl}${post.slug}`,
        date: new Date(post.publishDate),
        image:
          post.image == ""
            ? `${siteMetadata.siteUrl}/og?title=${post.title}`
            : `${siteMetadata.siteUrl}${post.image}`,
      });
    });

  const rssFeed = feed.json1();

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "private,must-revalidate,max-age=86400", // must revalidate, and must be cached by the client for 1 days
    },
  });
}
