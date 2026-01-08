"use client";

import { Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">U</span>
          </div>
          <span className="font-semibold">Utoo</span>
          <span className="text-muted-foreground text-sm">
            - Lightning Fast Web Bundler
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/AntdFarm/utoo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com/AntdFarm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
        </div>

        <div className="text-sm text-muted-foreground">
          Powered by{" "}
          <a
            href="https://www.npmjs.com/package/@utoo/web"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            @utoo/web
          </a>
        </div>
      </div>
    </footer>
  );
}
