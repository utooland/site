"use client";

import { Github } from "lucide-react";
import { useI18n } from "../i18n/context";

function UtooLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#logo-gradient)" />
      <path
        d="M10 10V18C10 20.2091 11.7909 22 14 22H18C20.2091 22 22 20.2091 22 18V10"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Footer() {
  const { locale } = useI18n();

  return (
    <footer className="border-t border-border py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <UtooLogo className="w-8 h-8" />
          <span className="font-semibold">Utoo</span>
          <span className="text-muted-foreground text-sm">
            - {locale === "zh" ? "通用前端工具链" : "Unified Toolchain"}
          </span>
        </div>

        <a
          href="https://github.com/utooland/utoo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github className="w-5 h-5" />
        </a>

        <div className="text-sm text-muted-foreground">
          Powered by{" "}
          <a
            href="https://github.com/utooland/utoo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
          >
            utoo
          </a>
          {" & "}
          <a
            href="https://turbo.build/pack"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 dark:text-pink-400 hover:text-pink-600 dark:hover:text-pink-300 transition-colors"
          >
            turbopack
          </a>
        </div>
      </div>
    </footer>
  );
}
