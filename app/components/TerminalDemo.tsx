"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalLine {
  type: "command" | "output" | "success" | "info" | "highlight";
  text: string;
}

const demos: { title: string; package: string; lines: TerminalLine[] }[] = [
  {
    title: "Install Dependencies",
    package: "utoo",
    lines: [
      { type: "command", text: "$ ut install" },
      { type: "info", text: "Reading package-lock.json..." },
      { type: "output", text: "Resolving 156 packages..." },
      { type: "output", text: "Downloading from registry..." },
      { type: "output", text: "├── react@19.2.3" },
      { type: "output", text: "├── antd@5.24.0" },
      { type: "output", text: "└── tailwindcss@3.4.19" },
      { type: "success", text: "✓ Installed in 2.3s" },
    ],
  },
  {
    title: "Generate Lock File",
    package: "utoo",
    lines: [
      { type: "command", text: "$ ut deps" },
      { type: "info", text: "Analyzing package.json..." },
      { type: "output", text: "Resolving dependency tree..." },
      { type: "output", text: "Fetching package metadata..." },
      { type: "highlight", text: "→ Compatible with npm lockfile v3" },
      { type: "success", text: "✓ package-lock.json generated" },
      { type: "output", text: "  156 packages resolved" },
    ],
  },
  {
    title: "View Package Info",
    package: "utoo",
    lines: [
      { type: "command", text: "$ ut view react" },
      { type: "output", text: "" },
      { type: "info", text: "react@19.2.3 | MIT | deps: none" },
      { type: "output", text: "" },
      { type: "output", text: "dist-tags:" },
      { type: "output", text: "  latest: 19.2.3" },
      { type: "output", text: "  canary: 19.3.0-canary" },
      { type: "success", text: "  next: 19.3.0-canary" },
    ],
  },
  {
    title: "Workspace Build",
    package: "utoo",
    lines: [
      { type: "command", text: "$ ut run build --workspaces" },
      { type: "info", text: "Analyzing dependency graph..." },
      { type: "output", text: "Building in topological order:" },
      { type: "success", text: "✓ @utoo/core" },
      { type: "success", text: "✓ @utoo/pack" },
      { type: "success", text: "✓ @utoo/web" },
      { type: "success", text: "✓ All workspaces built" },
    ],
  },
  {
    title: "Execute Remote Package",
    package: "utoo",
    lines: [
      { type: "command", text: "$ utx cowsay hello utoo" },
      { type: "info", text: "Fetching cowsay@latest..." },
      { type: "output", text: " _____________" },
      { type: "output", text: "< hello utoo >" },
      { type: "output", text: " -------------" },
      { type: "output", text: "        \\   ^__^" },
      { type: "output", text: "         \\  (oo)\\_______" },
      { type: "output", text: "            (__)\\       )\\/\\" },
    ],
  },
  {
    title: "Dev Server",
    package: "@utoo/pack-cli",
    lines: [
      { type: "command", text: "$ up dev" },
      { type: "info", text: "Starting dev server..." },
      { type: "output", text: "Compiling..." },
      { type: "success", text: "✓ Ready in 120ms" },
      { type: "output", text: "" },
      { type: "info", text: "  Local:   http://localhost:3000" },
      { type: "output", text: "  Network: http://192.168.1.10:3000" },
      { type: "highlight", text: "  HMR enabled" },
    ],
  },
  {
    title: "Build Project",
    package: "@utoo/pack-cli",
    lines: [
      { type: "command", text: "$ up build" },
      { type: "info", text: "Reading utoopack.json..." },
      { type: "output", text: "Compiling TypeScript..." },
      { type: "output", text: "Bundling with tree-shaking..." },
      { type: "output", text: "" },
      { type: "output", text: "  dist/index.js     45.2 kB" },
      { type: "output", text: "  dist/index.css    12.1 kB" },
      { type: "success", text: "✓ Build complete in 0.8s" },
    ],
  },
  {
    title: "Webpack Compat",
    package: "@utoo/pack-cli",
    lines: [
      { type: "command", text: "$ up build --webpack" },
      { type: "info", text: "Reading webpack.config.js..." },
      { type: "output", text: "Using Webpack compatibility mode" },
      { type: "output", text: "Compiling with existing config..." },
      { type: "output", text: "" },
      { type: "output", text: "  dist/bundle.js    62.4 kB" },
      { type: "success", text: "✓ Build complete in 1.2s" },
    ],
  },
];

export function TerminalDemo() {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const demo = demos[currentDemo];
    setVisibleLines(0);
    setIsTyping(true);

    let lineIndex = 0;
    const showNextLine = () => {
      if (lineIndex < demo.lines.length) {
        setVisibleLines(lineIndex + 1);
        lineIndex++;
        const delay = demo.lines[lineIndex - 1]?.type === "command" ? 800 : 150;
        timeoutRef.current = setTimeout(showNextLine, delay);
      } else {
        setIsTyping(false);
        timeoutRef.current = setTimeout(() => {
          setCurrentDemo((prev) => (prev + 1) % demos.length);
        }, 3000);
      }
    };

    timeoutRef.current = setTimeout(showNextLine, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentDemo]);

  const demo = demos[currentDemo];

  const getLineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "command":
        return "text-green-400";
      case "success":
        return "text-emerald-400";
      case "info":
        return "text-blue-400";
      case "highlight":
        return "text-yellow-300";
      default:
        return "text-slate-300";
    }
  };

  return (
    <div className="relative">
      {/* Terminal window */}
      <div className="rounded-xl overflow-hidden border border-white/10 bg-slate-900 backdrop-blur-xl shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono">
              {demo.title}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                demo.package === "utoo"
                  ? "bg-purple-500/20 text-purple-300"
                  : "bg-pink-500/20 text-pink-300"
              }`}
            >
              {demo.package}
            </span>
          </div>
        </div>

        {/* Terminal content */}
        <div className="p-4 font-mono text-sm h-[280px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDemo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {demo.lines.slice(0, visibleLines).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`${getLineColor(line.type)} ${
                    line.text === "" ? "h-4" : ""
                  }`}
                >
                  {line.text}
                  {line.type === "command" &&
                    index === visibleLines - 1 &&
                    isTyping && (
                      <span className="inline-block w-2 h-4 ml-1 bg-green-400 animate-pulse" />
                    )}
                </motion.div>
              ))}
              {visibleLines === 0 && (
                <div className="text-green-400">
                  ${" "}
                  <span className="inline-block w-2 h-4 ml-1 bg-green-400 animate-pulse" />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Demo indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {demos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentDemo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentDemo
                ? "bg-purple-500 w-6"
                : "bg-slate-600 hover:bg-slate-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
