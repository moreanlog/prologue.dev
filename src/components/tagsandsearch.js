import SearchBar from "./searchbar";
import { allPosts } from "contentlayer/generated";
import Link from "next/link";

export default function TagsandSearch() {
  const tagsCount = {};

  allPosts.forEach((item) => {
    item.tags.forEach((tag) => {
      tagsCount[tag] = (tagsCount[tag] || 0) + 1;
    });
  });
  const sortedTags = Object.keys(tagsCount).sort(
    (a, b) => tagsCount[b] - tagsCount[a]
  );

  return (
    <div className="">
      <div className="max-w-lg mx-auto py-16">
        {sortedTags.map((tag) => (
          <Link key={tag} className="inline-flex rounded-lg px-3 py-2 font-normal text-zinc-500 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-slate-800 transition trasnform duration-400 select-none" href={`/tags/${tag}`}>
            {tag}({tagsCount[tag]})
          </Link>
        ))}
      </div>
      <SearchBar />
    </div>
  );
}
