"use client";

import { useState, useEffect } from "react";
import { allPosts } from "contentlayer/generated";
import PostCard from "./postcard";

const data = allPosts
  .filter((post) => post.draft === false)
  .map((item) => {
    return {
      title: item.title,
      description: item.description,
      slug: item.slug,
      content: item.body.raw,
      readingTime: item.readingTime,
      tags: item.tags,
      image: item.image,
    };
  });

const options = {
  includeScore: false,
  includeMatches: false,
  minMatchCharLength: 2,
  ignoreLocation: true,
  findAllMatches: true,
  shouldSort: true,
  keys: [
    {
      name: "title",
      weight: 1,
    },
    {
      name: "description",
      weight: 0.5,
    },
    {
      name: "content",
      weight: 1,
    },
    {
      name: "slug",
      weight: 0.2,
    },
  ],
  threshold: 0.0,
};
const SearchBar = () => {
  const [query, updateQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const getSearchResults = async (query) => {
    const Fuse = (await import("fuse.js")).default;
    const response = new Fuse(data, options);
    const results = response.search(query, { limit: 5 });
    setSearchResults(results);
  };

  useEffect(() => {
    if (query.length >= 2) {
      getSearchResults(query);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  return (
    <div className="max-w-2xl mx-auto relative">
      <input
        aria-label={"Search"}
        type="text"
        value={query}
        placeholder={"Search..."}
        onChange={(input) => updateQuery(input.target.value)}
        className="block w-full rounded-md border border-zinc-300 bg-white px-4 py-2 text-zinc-900 focus:border-zinc-500 focus:ring-zinc-500  drop-shadow-sm focus:drop-shadow dark:border-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
      />
      <svg
        className="absolute right-3 top-3 h-5 w-5 text-zinc-400 dark:text-zinc-300"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <div className="">
        {query.length >= 2 && searchResults.length > 0 ? (
          <>
            <div className="leading-relaxed py-4 ">
              {searchResults.map((result) => (
              

                <div key={result.item.slug} className="leading-relaxed mx-auto max-w-sm">
  <PostCard title={result.item.title} slug={result.item.slug} description={result.item.description} publishDate={result.item.publishDate} readingTime={result.item.readingTime.text} tags={result.item.tags} image={result.item.image} />
                </div>
              ))}
            </div>
          </>
        ) : query.length >= 2 && searchResults.length === 0 ? (
          <p>No results</p>
        ) : null}
      </div>
    </div>
  );
};

export default SearchBar;
