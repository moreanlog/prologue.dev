import Link from "next/link";
import moment from "moment/moment";
import Image from "next/image";

export default function PostCard({
  slug,
  title,
  description,
  pubDate,
  tags,
  image,
}) {
  return (
    <div className="py-4">
      <div className="py-1 mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        <time>{moment(pubDate).format("LL")}</time>
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

      <Link href={slug}>
        {image != "" ? (
          <div className="relative overflow-hidden bg-cover bg-no-repeat inset-0 rounded-xl ring-1 ring-inset ring-zinc-900/10 my-2 drop-shadow-sm shadow-sm">
            <Image
              src={image}
              width={600}
              height={400}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt={"featured image " + title}
              className="transition  hover:opacity-90 duration-300 ease-in-out  hover:scale-105 hover:shadow-lg"
            />
          </div>
        ) : null}
        <h3 className="no-underline hover:underline text-xl font-semibold py-2">
          {title}
        </h3>
      </Link>
      {description && (
        <p className="prose py-1 dark:prose-invert max-w-none">{description}</p>
      )}
    </div>
  );
}
