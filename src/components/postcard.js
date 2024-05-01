import Link from "next/link";
import moment from "moment/moment";

export default function PostCard({
  slug,
  title,
  description,
  publishDate,
  tags
}) {
  return (
    <div className="py-3 max-w-sm">
      <Link href={slug}>
        <h3 className="no-underline hover:underline text-xl font-semibold py-2">
          {title}
        </h3>
      </Link>
      {description && (
        <p className="prose py-1 dark:prose-invert max-w-none">{description.length>80?description.substring(0,80)+"...":description}</p>
      )}
      <div className="py-1 text-sm text-zinc-500 dark:text-zinc-400">
        <time>{moment(publishDate).format("LL")}</time>
        <span className="pl-1">
          {tags.map((tag) => (
            <Link
              key={tag}
              className="py-4 hover:text-zinc-800 dark:hover:text-zinc-200"
              href={`/tags/${tag}`}
            >
              <span className="hover:bg-zinc-100 rounded-md px-1 py-1 transition duration-500 dark:hover:bg-zinc-800">
                {tag}
              </span>
            </Link>
          ))}
        </span>
      </div>
    </div>
  );
}
