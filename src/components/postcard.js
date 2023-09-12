import Link from "next/link";
import moment from "moment/moment";

export default function PostCard({
  slug,
  title,
  description,
  pubDate,
  readingTime,
  tags
}) {
  return (
    <div className="py-4">
      {tags ==''|| !tags?null:<div className="text-sm text-zinc-500 dark:text-zinc-400">{tags.map(tag => (<Link key={tag} className="pr-2 py-4 hover:text-zinc-800 dark:hover:text-zinc-200"href={`/tags/${tag}`}>{tag}</Link>))}</div>}
      <Link href={slug} passHref>
        <h3 className="no-underline hover:underline text-xl font-semibold py-2 mt-1">
          {title}
        </h3>
      </Link>
      {description && (
        <p className="prose py-1 dark:prose-invert max-w-none">{description}</p>
      )}
      <div className="py-2 text-sm text-zinc-500 dark:text-zinc-400">
        <time>{moment(pubDate).format("LL")}</time>
        <span className="select-none"> · </span>
        <span>{readingTime}</span>
      </div>
    </div>
  );
}