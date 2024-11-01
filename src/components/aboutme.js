import Link from "next/link"
import Image from "next/image"
import { allPosts } from "contentlayer/generated";
import siteMetadata from "../../data/sitemetadata"

export default function AboutMe(){
    const postsNum = allPosts.length;
    const totalWords = allPosts
      .map((post) => post.readingTime.words)
      .reduce((partialSum, a) => partialSum + a, 0)
      .toLocaleString();
    return(
        <>
        <h2 className="font-semibold prose-h2">About Author</h2>
        <Link href="/about">
          <Image
            src={siteMetadata.avatar}
            alt="Avatar"
            width="100"
            height="100"
            className="rounded-full max-w-md mx-auto drop-shadow mt-6 hover:shadow hover:ring-2 hover:ring-zinc-100 dark:ring-zinc-300 transition transform duration-500"
          />
        </Link>
        <p className="prose-lg text-center pt-4">{siteMetadata.author}</p>

        <div className="grid grid-cols-2 divide-x dark:divide-zinc-700 py-4 mx-auto">
          <div className="grid grid-rows-2  text-center px-2">
            <Link
              href="/blog"
              className="hover:underline hover:underline-offset-2"
            >
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
        <p className="py-4 mb-2 text-center mx-auto text-zinc-700 dark:text-zinc-300 leading-7">
          {siteMetadata.authorDesc}
        </p>
        <Link href="/about" passHref>
          <p className="text-right text-sm pt-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline transition duration-400">
            About More →
          </p>
        </Link>
        </>
    )
}