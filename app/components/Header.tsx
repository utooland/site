"use client";

import { Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "../theme/context";
import { useI18n } from "../i18n/context";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale } = useI18n();

  return (
    <header className="fixed top-0 right-0 z-50 p-4">
      <div className="flex items-center gap-2">
        {/* Language switcher */}
        <button
          onClick={() => setLocale(locale === "en" ? "zh" : "en")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass hover:opacity-80 transition-all text-sm"
          title={locale === "en" ? "切换到中文" : "Switch to English"}
        >
          <Globe className="w-4 h-4" />
          <span>{locale === "en" ? "EN" : "中文"}</span>
        </button>

        {/* Theme switcher */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg glass hover:opacity-80 transition-all"
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>
      </div>
    </header>
  );
}
