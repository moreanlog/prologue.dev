"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

function NotByAI() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid rendering until component is mounted on the client

  const ImageTheme =
    theme === "dark" || resolvedTheme === "dark" ? "dark" : "light";
  const src =
    ImageTheme === "dark"
      ? "/static/favicons/Written-By-Human-Not-By-AI-Badge-black.svg"
      : "/static/favicons/Written-By-Human-Not-By-AI-Badge-white.svg";

  return (
    <Link href="https://notbyai.fyi/" target="_blank">
      <Image src={src} width="120" height="80" alt="NotByAI" />
    </Link>
  );
}

export default NotByAI;
