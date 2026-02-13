"use client";

import { Moon, Sun, Globe, BookOpen, Search } from "lucide-react";
import { useTheme } from "../theme/context";
import { useI18n } from "../i18n/context";
import Link from "next/link";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useI18n();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.03] backdrop-blur-xl bg-black/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-16 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <span className="text-black font-black text-xl">U</span>
          </div>
          <span className="font-black text-xl tracking-tighter">UTOO</span>
        </Link>
        <div className="flex items-center gap-2">
          {/* Docs link */}
          <Link
            href={`/${locale}/docs/utoo`}
            className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-white/5"
          >
            <BookOpen className="w-4 h-4" />
            <span>{t.hero.docs}</span>
          </Link>

          {/* Wiki link */}
          <a
            href="https://deepwiki.com/utooland/utoo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-white/5"
          >
            <Search className="w-4 h-4" />
            <span>{t.hero.wiki}</span>
          </a>

          <div className="w-px h-4 bg-white/10 mx-2" />

          {/* Language switcher */}
          <button
            onClick={() => setLocale(locale === "en" ? "zh" : "en")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-white/5"
          >
            <Globe className="w-4 h-4" />
            <span>{locale === "en" ? "EN" : "ZH"}</span>
          </button>

          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl transition-all duration-300 text-muted-foreground hover:text-foreground hover:bg-white/5"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
