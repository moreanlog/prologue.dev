import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import "katex/dist/katex.min.css";
import siteMetadata from "../../../../data/sitemetadata";
import ScrollTopAndComment from "../../../components/scroll";
import TableofContent from "../../../components/toc";
import Comments from "../../../components/comments";
import Link from "next/link";
import moment from "moment";
import Image from "next/image";


async function getPostFromParams(params) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
}

async function getAdjacentPosts(post) {
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(a.publishDate) - new Date(b.publishDate)
  );

  const currentIndex = sortedPosts.findIndex((p) => p === post);

  const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < sortedPosts.length - 1
      ? sortedPosts[currentIndex + 1]
      : null;

  const result = {};

  if (previousPost) {
    result.previousPostTitle = previousPost.title;
    result.previousPostSlug = previousPost.slugAsParams;
  }

  if (nextPost) {
    result.nextPostTitle = nextPost.title;
    result.nextPostSlug = nextPost.slugAsParams;
  }

  return result;
}

export async function generateMetadata({ params }) {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title + " - " + siteMetadata.publishName,
    description: post.description,
    openGraph: {
      url: `/blog/${post.slugAsParams}`,
      title: post.title + " - " + siteMetadata.publishName,
      description: post.description,
      type: "article",
      images: [
        post.image == ""
          ? { url: `/og?title=${post.title}` }
          : { url: post.image },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title + " - " + siteMetadata.publishName,
      description: post.description,
      creator: siteMetadata.twitter,
      siteId: siteMetadata.twitterid,
      creatorId: siteMetadata.twitterid,
      images: [
        post.image === null
          ? `/og?title=${post.title}`
          : post.image,
      ],
    },
  };
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }) {
  const post = await getPostFromParams(params);
  if (!post || post.draft === true) {
    notFound();
  }
  const postsNum = allPosts.length;
  const totalWords = allPosts
    .map((post) => post.readingTime.words)
    .reduce((partialSum, a) => partialSum + a, 0)
    .toLocaleString();
  const adjacentPosts = await getAdjacentPosts(post);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    datePublished: post.publishDate,
    dateModified: post.lastmod,
    headline: post.title,
    image:
      post.image == ""
        ? [`/og?title=${post.title}`]
        : [post.image, `/og?title=${post.title}`],
    description: post.description,
    author: [
      {
        "@type": "Person",
        name: `${siteMetadata.author}`,
        url: `/about`,
      },
    ],
  };
  return (
    <>
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </section>
      <div className="relative xl:grid xl:grid-cols-10 gap-8 mx-auto max-w-7xl">
        <div className="col-span-8">
          <article className="py-8 prose mx-auto dark:prose-invert max-w-3xl">
            <div className="prose-sm select-none">
              <time>{moment(post.publishDate).format("LL")}</time> ·{" "}
              {post.readingTime.words} words · {post.readingTime.text}
              {post.tags == "" || null
                ? null
                : post.tags.map((tag) => (
                    <Link
                      href={`/tags/${tag}`}
                      key={tag}
                      className="px-1 text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-zinc-100 no-underline font-normal"
                    >
                      {" "}
                      {`${tag}`}
                    </Link>
                  ))}
            </div>
            <h1 className="pt-6 leading-relaxed">{post.title}</h1>
            {post.description && (
              <p className="text-zinc-700 dark:text-zinc-300 pb-4">
                {post.description}
              </p>
            )}
            {post.image != "" ? (
              <Image
                src={post.image}
                width={1920}
                height={1080}
                alt={"featured image " + post.title}
                className="inset-0 rounded-xl ring-1 ring-inset ring-zinc-900/10 my-2 drop-shadow-sm shadow-sm"
              />
            ) : null}
            {post.imageDesc != "" ? <p className="text-zinc-500 dark:text-zinc-300">{post.imageDesc}</p>: null}

            <hr/>
            <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
            <p className="prose-sm pt-4">
              {post.lastmod
                ? `Last Updated: ${moment(post.lastmod).format("LL")}`
                : null}
            </p>
            <Link
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              target="_blank"
            >
              <p className="mt-12 py-2 text-sm text-right sm:text-left text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-200 transition duration-400">
                CC BY-NC-SA 4.0
              </p>
            </Link>
            <hr />

            <Comments />
          </article>
          <Link
            href={`https://github.com/${siteMetadata.github}/${siteMetadata.siteRepo}/blob/master/data/content${post.urlslug}.md`}
            target="_blank"
          >
            <p className="text-right py-2 text-sm  text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-200 transition duration-400">
              View on Github
            </p>
          </Link>
          <div className="justify-between flex gap-8 py-8 leading-relaxed">
            {adjacentPosts.previousPostTitle !== null &&
            typeof adjacentPosts.previousPostTitle !== "undefined" ? (
              <div>
                <p className="prose dark:prose-invert text-left">
                  Previous Post
                </p>
                <Link
                  href={`/blog/${adjacentPosts.previousPostSlug}`}
                  className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-zinc-100 hover:underline transition duration-400"
                >
                  {adjacentPosts.previousPostTitle}
                </Link>
              </div>
            ) : null}

            {adjacentPosts.nextPostTitle !== null &&
            typeof adjacentPosts.nextPostTitle !== "undefined" ? (
              <div>
                {" "}
                <p className="prose dark:prose-invert">Next Post</p>
                <Link
                  href={`/blog/${adjacentPosts.nextPostSlug}`}
                  className=" text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-zinc-100 hover:underline transition duration-400"
                >
                  {adjacentPosts.nextPostTitle}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
        <div className="col-span-2 mx-auto">
          <div>
            <h2 className="font-semibold prose-h2 mt-6">About Author</h2>
            <Link href="/about">
            <Image
              src={siteMetadata.avatar}
              alt="Avatar"
              width="100"
              height="100"
              className="rounded-full max-w-md mx-auto drop-shadow mt-6 hover:shadow hover:ring-1 hover:ring-zinc-100 dark:ring-zinc-500 transition transform duration-500"
            />
            </Link>
            <p className="prose-lg text-center pt-4">{siteMetadata.author}</p>

            <div className="grid grid-cols-2 divide-x dark:divide-zinc-700 py-4 mx-auto">
              <div className="grid grid-rows-2  text-center px-2">
                <Link href="/blog" className="hover:underline hover:underline-offset-2">
                {postsNum}
                </Link>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 pt-1">
                  Posts
                </p>
                
              </div>

              <div className="grid grid-rows-2  text-center px-2">
                {totalWords}
                <p className="text-sm text-zinc-600 dark:text-zinc-400 pt-1">
                  Words
                </p>
              </div>
            </div>
            <p className="py-4 text-center mx-auto prose-p">
              {siteMetadata.authorDesc}
            </p>
            <Link href="/about" passHref>
              <p className="text-right text-sm pt-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline transition duration-400">
                About More →
              </p>
            </Link>
          </div>
          <div className="sticky top-0 pt-10">
            <div className="hidden xl:block">
              <h3 className="text-zinc-600 dark:text-zinc-300 py-4 mt-4">
                On this page
              </h3>
              {post.headings.map((heading) => {
                return (
                  <div key={heading.text}>
                    <TableofContent heading={heading} />
                  </div>
                );
              })}
            </div>

            <Link href="/">
              <p className="py-2 text-sm text-right sm:text-left text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-200 transition duration-400">
                ← Back
              </p>
            </Link>
          </div>
        </div>
      </div>

      <ScrollTopAndComment />
    </>
  );
}
