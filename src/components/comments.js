"use client";

import Giscus from "@giscus/react";
import React, { useState, useCallback } from "react";
import { useTheme } from "next-themes";
import siteMetadata from "../../data/sitemetadata";

const Comments = () => {
  const [enableLoadComments, setEnabledLoadComments] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const commentsTheme =
    theme === "dark" || resolvedTheme === "dark" ? "transparent_dark" : "light";
  const LoadComments = useCallback(() => {
    setEnabledLoadComments(true);
  }, []);
  const CloseComments = useCallback(() => {
    setEnabledLoadComments(false);
  }, []);
  return (
    <div>
      <div id="comments" className="my-8 text-center text-sm text-zinc-500 dark:text-zinc-300 rounded-lg py-1 px-2 hover:bg-zinc-100 hover:dark:bg-zinc-800 max-w-fit transform transition duration-400 mx-auto select-none">
        {enableLoadComments == false ? (
          <button onClick={LoadComments}>▲ Load Comments</button>
        ) : (
          <button onClick={CloseComments}>▼ Close Comments</button>
        )}
      </div>
      {enableLoadComments == true ? (
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
      ) : (
        ""
      )}
    </div>
  );
};

export default Comments;
