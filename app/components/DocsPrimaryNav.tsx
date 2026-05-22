"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type DocsPrimaryNavProps = {
  locale: string;
};

const linkClassName =
  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors";
const activeClassName =
  "bg-gray-100 text-gray-950 dark:bg-white/10 dark:text-gray-50";
const inactiveClassName =
  "text-gray-600 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-gray-50";

export function DocsPrimaryNav({ locale }: DocsPrimaryNavProps) {
  const pathname = usePathname();
  const isZh = locale === "zh";
  const blogHref = `/${locale}/docs/blog`;
  const docsHref = `/${locale}/docs/utoo`;
  const isBlog = pathname?.startsWith(blogHref) ?? false;

  return (
    <nav
      aria-label={isZh ? "主导航" : "Primary navigation"}
      className="hidden items-center gap-1 md:flex"
    >
      <Link
        href={docsHref}
        className={`${linkClassName} ${isBlog ? inactiveClassName : activeClassName}`}
      >
        {isZh ? "文档" : "Docs"}
      </Link>
      <Link
        href={blogHref}
        className={`${linkClassName} ${isBlog ? activeClassName : inactiveClassName}`}
      >
        {isZh ? "博客" : "Blog"}
      </Link>
    </nav>
  );
}
