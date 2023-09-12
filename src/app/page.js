import { allPosts } from "contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import siteMetadata from "../../data/sitemetadata";
import PostCard from "../components/postcard";

export default function Home() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.pubDate), new Date(b.pubDate));
  });
  const postsNum = posts.length;
  const totalWords = posts
    .map((post) => post.readingTime.words)
    .reduce((partialSum, a) => partialSum + a, 0)
    .toLocaleString();

  return (
    <div>
      <div className="mx-auto max-w-2xl py-20 max-h-screen mt-8">
        <h1 className="text-2xl font-semibold py-8">
          {siteMetadata.headerTitle}
        </h1>
        <p className="text-xl">{siteMetadata.description}</p>
      </div>
      <div className="relative lg:grid lg:grid-cols-9 lg:gap-4 pt-12 max-w-6xl">
        <div className="max-w-xl mx-auto col-span-7">
          <h2 className="font-semibold py-4 pt-16">Latest Posts</h2>
          {posts
            .filter((post) => post.draft === false)
            .slice(0, 5)
            .map((post) => (
              <article key={post._id} className="">
                <PostCard
                  title={post.title}
                  slug={post.slug}
                  description={post.description}
                  pubDate={post.pubDate}
                  readingTime={post.readingTime.text}
                  tags={post.tags}
                />
              </article>
            ))}
          <Link href="/blog" passHref>
            <p className="text-right text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline transition duration-400">
              Read More →
            </p>
          </Link>
        </div>
        <div className="col-span-2 max-w-lg mx-auto  ">
          <div className="sticky top-0 pt-12">
          <h2 className="font-semibold py-4">About Author</h2>
          <Image
            src="/static/favicons/avatar.png"
            alt="Avatar"
            width="100"
            height="100"
            className="rounded-full max-w-md mx-auto shadow drop-shadow mt-4"
          />
          <p className="prose-lg text-center pt-4">{siteMetadata.author}</p>

          <div className="grid grid-cols-2 divide-x dark:divide-zinc-700 py-4 mx-auto">
            <div className="grid grid-rows-2  text-center px-2">
              {postsNum}
              <p className="text-sm text-zinc-600 dark:text-zinc-400 pt-1">Posts</p>
            </div>

            <div className="grid grid-rows-2  text-center px-2">
              {totalWords}
              <p className="text-sm text-zinc-600 dark:text-zinc-400 pt-1">Words</p>
            </div>
          </div>
          <p className="py-4 text-center mx-auto">{siteMetadata.authorDesc}</p>
          <Link href="/about" passHref>
            <p className="text-right text-sm pt-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline transition duration-400">
              About More →
            </p>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    images: [siteMetadata.cover],
    authors: [siteMetadata.author],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteId: siteMetadata.twitterid,
    creator: siteMetadata.twitter,
    creatorId: siteMetadata.twitterid,
    images: [siteMetadata.cover],
  },
  locale: siteMetadata.language,
  type: "website",
};
