"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function useHighlighted(id) {
  const observer = useRef();
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleObserver = (entries) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: "0px 0px -40% 0px",
      threshold: 0.4,
    });

    const elements = document.querySelectorAll("h2, h3, h4");
    elements.forEach((elem) => observer.current.observe(elem));
    return () => observer.current?.disconnect();
  }, []);

  return [activeId === id, setActiveId];
}

export default function TableofContent({ heading }) {
  const id = heading.id;
  const [highlighted, setHighlighted] = useHighlighted(id);
  return (
    <div>
      <Link
        data-level={heading.level}
        href={`#${heading.text}`}
        className={`"data-[level=two]:ml-1 data-[level=three]:ml-2 leading-9 rounded-lg px-3 py-1 font-normal text-zinc-500 dark:text-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 dark:hover:text-zinc-50 dark:hover:bg-zinc-800 transition duration-400"  ${
          highlighted &&
          "bg-zinc-50 text-zinc-900 dark:text-zinc-100 dark:bg-zinc-800"
        }`}
        onClick={(e) => {
          e.preventDefault();
          setHighlighted(id);
          document
            .getElementById(id)
            .scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      >
        {heading.text}
      </Link>
    </div>
  );
}
