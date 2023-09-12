import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import "katex/dist/katex.min.css";
import { MDXComponent } from "../../../components/mdxcomponent";
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

export async function generateMetadata({ params }) {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title + " - " + siteMetadata.publishName,
    description: post.description,
    openGraph: {
      url: `${siteMetadata.siteUrl}/blog/${post.slugAsParams}`,
      title: post.title + " - " + siteMetadata.publishName,
      description: post.description,
      type: "article",
      images: [
        post.image == ""
          ? { url: `${siteMetadata.siteUrl}/og?title=${post.title}` }
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
      images: [post.image === null ? `${siteMetadata.siteUrl}/og?title=${post.title}` : post.image],
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    datePublished: post.pubDate,
    headline: post.title,
    image:
    post.image === ""
    ? [`${siteMetadata.siteUrl}/og?title=${post.title}`]
    : [post.image, `${siteMetadata.siteUrl}/og?title=${post.title}`],
    description: post.description,
    author: [
      {
        "@type": "Person",
        name: `${siteMetadata.author}`,
        url: `${siteMetadata.siteUrl}/about`,
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
      <div className="relative xl:grid xl:grid-cols-8 gap-8 mx-auto max-w-7xl">
        <div className="col-span-6">
        <article className="py-8 prose mx-auto dark:prose-invert max-w-2xl">
          <div className="prose-sm select-none">
            <time>{moment(post.pubDate).format("LL")}</time> ·{" "}
            {post.readingTime.words} words
            {post.tags==""||null ?null:post.tags.map(tag => <Link href={`/tags/${tag}`} key={tag} className="px-1 text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-zinc-100 no-underline font-normal"> {`${tag}`}</Link>)}
          </div>
          <h1 className="mb-2 py-4 leading-relaxed">{post.title}</h1>
          {post.description && (
            <p className="mt-4 text-slate-700 dark:text-slate-200">
              {post.description}
            </p>
          )}
          <hr className="py-2 pt-2" />
          <MDXComponent code={post.body.code} />
          <p className="prose-sm">
            
            {post.updatedDate ?  `Last Updated: ${moment(post.updatedDate).format("LL")}` : null}
          </p>
          <hr />
          <Comments />
        </article>
      
        </div>
        <div className="col-span-2 mx-auto select-none">
        <div>
            <h2 className="text-zinc-600 dark:text-zinc-300 py-6">About Author</h2>
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
            <Link
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              passHref
            >
              <p className="mt-8 text-sm text-right sm:text-left text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-200 transition duration-400">
              CC BY-NC-SA 4.0
              </p>
            </Link>
            <Link href="/" passHref>
              <p className="py-3 text-sm text-right sm:text-left text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-200 transition duration-400">
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
