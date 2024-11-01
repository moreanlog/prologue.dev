import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import Link from "next/link";
import siteMetadata from "../../data/sitemetadata";
import PostCard from "../components/postcard";
import AboutMe from "../components/aboutme";

export default function Home() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.publishDate), new Date(b.publishDate));
  });

  return (
    <div>
      <div className="mx-auto max-w-2xl py-28 max-h-screen mt-8">
        <h1 className="text-2xl font-semibold py-8">
          {siteMetadata.headerTitle}
        </h1>
        <p className="text-xl">{siteMetadata.description}</p>
      </div>

      <div className="relative lg:grid lg:grid-cols-9 lg:gap-8 pt-12 max-w-6xl">
        <div className="max-w-4xl mx-auto col-span-7">
          <h2 className="pt-16 prose-h2 font-semibold">Featured</h2>
          <div className="py-4 mb-2 md:grid md:grid-cols-2 md:gap-4 lg:gap-8">
            {posts
              .filter((post) => post.draft === false && post.featured == true)
              .slice(0, 4)
              .map((post) => (
                <article key={post._id} className="">
                  <div className="leading-relaxed mx-auto max-w-sm">
                    <PostCard
                      title={post.title}
                      slug={post.slug}
                      description={post.description}
                      publishDate={post.publishDate}
                      readingTime={post.readingTime.text}
                      tags={post.tags}
                      image={post.image}
                    />
                  </div>
                </article>
              ))}
          </div>
          <h2 className="font-semibold prose-h2 pt-4">Latest</h2>
          <div className="md:grid md:grid-cols-2 md:gap-8 lg:gap-12">
            {posts
              .filter((post) => post.draft === false && post.featured !== true)
              .slice(0, 10)
              .map((post) => (
                <article key={post._id} className="">
                  <div className="leading-relaxed mx-auto max-w-sm">
                    <PostCard
                      title={post.title}
                      slug={post.slug}
                      description={post.description}
                      publishDate={post.publishDate}
                      readingTime={post.readingTime.text}
                      tags={post.tags}
                    />
                  </div>
                </article>
              ))}
          </div>
          <Link href="/blog">
            <p className="text-right text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline transition duration-400">
              Read More →
            </p>
          </Link>
        </div>
        <div className="col-span-2 max-w-lg mx-auto">
          <div className="sticky top-0 pt-12">
            <AboutMe />
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
    images: [siteMetadata.cover],
  },
  locale: siteMetadata.language,
  type: "website",
};
