import { allPosts } from "contentlayer/generated";
import { compareDesc, parseISO, format } from "date-fns";
import siteMetadata from "../../../data/sitemetadata";
import Link from "next/link";

export default function Archive() {
  const postsByYear = allPosts.reduce((accumulator, post) => {
    const year = format(parseISO(post.publishDate), "yyyy");
    accumulator[year] = accumulator[year] || [];
    accumulator[year].push(post);
    return accumulator;
  }, {});

  const sortedYears = Object.keys(postsByYear).sort((a, b) =>
    compareDesc(new Date(a), new Date(b))
  );

  return (
    <div className="prose dark:prose-invert prose-h3:font-normal max-w-2xl mx-auto">
      <h1>Archive</h1>
      {sortedYears.map((year) => (
        <div key={year} className="max-w-2xl mx-auto">
          <hr />
          <h3 className="font-bold">{year}</h3>
          {postsByYear[year].map((post) => (
            <Link
              href={post.slug}
              key={post.slug}
              className="hover:underline underline-offset-auto"
            >
              <h3>{post.title}</h3>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

export const metadata = {
  title: `Blog - ${siteMetadata.publishName}`,
  description: "All posts here! 所有文章在这里！",
  openGraph: {
    title: `Blog - ${siteMetadata.publishName}`,
    description: "All posts here! 所有文章在这里！",
    url: `${siteMetadata.siteUrl}/blog`,
    images: [siteMetadata.cover],
    authors: [siteMetadata.author],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog - ${siteMetadata.publishName}`,
    description: "All posts here! 所有文章在这里！",
    siteId: siteMetadata.twitterid,
    creator: siteMetadata.twitter,
    creatorId: siteMetadata.twitterid,
    images: [siteMetadata.cover],
  },
  locale: siteMetadata.language,
  type: "website",
};
