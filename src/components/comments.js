"use client";

import Giscus from '@giscus/react';
import { useTheme } from "next-themes";
import siteMetadata from "../../data/sitemetadata";

export default function Comments(){
  const { theme, resolvedTheme } = useTheme();
  const commentsTheme =
    theme === "dark" || resolvedTheme === "dark" ? "transparent_dark" : "light";
  return (
    <div id="comments">
    <Giscus
      repo={`${siteMetadata.github}/${siteMetadata.siteRepo}`}
      repoId={siteMetadata.repoid}
      category="Announcements"
      categoryId={siteMetadata.categoryid}
      mapping="pathname"
      reactionsEnabled="1"
      inputPosition="top"
      theme={commentsTheme}
      lang="en"
    />
    </div>
  )
}

