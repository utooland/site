"use client";

import { motion } from "framer-motion";
import {
  Terminal,
  Globe,
  Cpu,
  Download,
  Search,
  Play,
  FileText,
  Box,
  RefreshCw,
  Gauge,
  Split,
  Palette,
  Cloud,
  HardDrive,
  Workflow,
  Copy,
  Check,
  Zap,
  Image as ImageIcon,
  Layout,
  Server,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useI18n } from "../i18n/context";
import type { Translations } from "../i18n/translations";

function highlightJS(code: string) {
  const tokens: { start: number; end: number; type: string }[] = [];

  const patterns: [RegExp, string][] = [
    [/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, "comment"],
    [/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g, "string"],
    [/\b(const|let|var|await|async|function|return|require|export|default|import|from)\b/g, "keyword"],
    [/\b(\d+)\b/g, "number"],
  ];

  for (const [regex, type] of patterns) {
    let match;
    while ((match = regex.exec(code)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      const overlaps = tokens.some(t => (start < t.end && end > t.start));
      if (!overlaps) {
        tokens.push({ start, end, type });
      }
    }
  }

  tokens.sort((a, b) => a.start - b.start);

const colors: Record<string, string> = {
    comment: "text-slate-500/80",
    string: "dark:text-amber-400 light:text-amber-600",
    keyword: "dark:text-pink-400 light:text-pink-600",
    number: "dark:text-purple-400 light:text-purple-600",
  };

  let result = "";
  let lastEnd = 0;

  for (const token of tokens) {
    result += escapeHtml(code.slice(lastEnd, token.start));
    result += `<span class="${colors[token.type]}">${escapeHtml(code.slice(token.start, token.end))}</span>`;
    lastEnd = token.end;
  }
  result += escapeHtml(code.slice(lastEnd));

  return result;
}

function escapeHtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded hover:bg-white/10 transition-colors"
      title="Copy"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4 text-slate-400" />
      )}
    </button>
  );
}

function getPackages(t: Translations) {
  return [
  {
    name: "utoo",
    tagline: t.packages.utoo.tagline,
    description: t.packages.utoo.description,
    color: "indigo",
    gradient: "from-indigo-500 to-blue-500",
    install: "npm i -g utoo",
    highlight: {
      icon: FileText,
      title: t.packages.utoo.highlight.title,
      description: t.packages.utoo.highlight.description,
    },
    features: [
      {
        icon: Download,
        title: t.packages.utoo.features.smartInstall.title,
        description: t.packages.utoo.features.smartInstall.description,
      },
      {
        icon: Search,
        title: t.packages.utoo.features.packageExplorer.title,
        description: t.packages.utoo.features.packageExplorer.description,
      },
      {
        icon: Play,
        title: t.packages.utoo.features.scriptRunner.title,
        description: t.packages.utoo.features.scriptRunner.description,
      },
      {
        icon: FileText,
        title: t.packages.utoo.features.lockGeneration.title,
        description: t.packages.utoo.features.lockGeneration.description,
      },
      {
        icon: Workflow,
        title: t.packages.utoo.features.workspaces.title,
        description: t.packages.utoo.features.workspaces.description,
      },
      {
        icon: HardDrive,
        title: t.packages.utoo.features.globalCache.title,
        description: t.packages.utoo.features.globalCache.description,
      },
    ],
    commands: [
      { cmd: "ut install", desc: t.packages.utoo.commands.install },
      { cmd: "ut add <pkg>", desc: t.packages.utoo.commands.add },
      { cmd: "ut remove <pkg>", desc: t.packages.utoo.commands.remove },
      { cmd: "ut deps", desc: t.packages.utoo.commands.deps },
      { cmd: "ut list <pkg>", desc: t.packages.utoo.commands.list },
      { cmd: "ut view <pkg>", desc: t.packages.utoo.commands.view },
      { cmd: "utx <pkg>", desc: t.packages.utoo.commands.utx },
    ],
    config: null,
    api: null,
  },
  {
    name: "@utoo/pack",
    tagline: t.packages.pack.tagline,
    description: t.packages.pack.description,
    color: "pink",
    gradient: "from-pink-500 to-rose-500",
    install: "ut i @utoo/pack @utoo/pack-cli -D",
    highlight: {
      icon: Workflow,
      title: t.packages.pack.highlight.title,
      description: t.packages.pack.highlight.description,
    },
    features: [
      {
        icon: Gauge,
        title: t.packages.pack.features.faster.title,
        description: t.packages.pack.features.faster.description,
      },
      {
        icon: RefreshCw,
        title: t.packages.pack.features.hmr.title,
        description: t.packages.pack.features.hmr.description,
      },
      {
        icon: Split,
        title: t.packages.pack.features.codeSplitting.title,
        description: t.packages.pack.features.codeSplitting.description,
      },
      {
        icon: Palette,
        title: t.packages.pack.features.css.title,
        description: t.packages.pack.features.css.description,
      },
      {
        icon: Box,
        title: t.packages.pack.features.webpack.title,
        description: t.packages.pack.features.webpack.description,
      },
      {
        icon: HardDrive,
        title: t.packages.pack.features.caching.title,
        description: t.packages.pack.features.caching.description,
      },
      {
        icon: Cpu,
        title: t.packages.pack.features.nodePolyfill.title,
        description: t.packages.pack.features.nodePolyfill.description,
      },
      {
        icon: Search,
        title: t.packages.pack.features.analysis.title,
        description: t.packages.pack.features.analysis.description,
      },
      {
        icon: Zap,
        title: t.packages.pack.features.optimization.title,
        description: t.packages.pack.features.optimization.description,
      },
      {
        icon: ImageIcon,
        title: t.packages.pack.features.images.title,
        description: t.packages.pack.features.images.description,
      },
      {
        icon: Layout,
        title: t.packages.pack.features.modernStyles.title,
        description: t.packages.pack.features.modernStyles.description,
      },
      {
        icon: Server,
        title: t.packages.pack.features.devServer.title,
        description: t.packages.pack.features.devServer.description,
      },
    ],
    commands: [
      { cmd: "utx up dev", desc: t.packages.pack.commands.dev },
      { cmd: "utx up build", desc: t.packages.pack.commands.build },
      { cmd: "utx up build --webpack", desc: t.packages.pack.commands.webpack },
    ],
    config: {
      file: ".umirc.ts",
      code: `export default defineConfig({
  utoopack: {}
});`,
      builtInto: t.packages.pack.config.builtInto,
      addConfig: t.packages.pack.config.addConfig,
    },
    api: {
      description: t.packages.pack.api.description,
      code: `const { build, dev } = require('@utoo/pack');

await build({
  root: process.cwd(),
  config: { mode: 'production' }
});

await dev({
  root: process.cwd(),
  config: { mode: 'development' }
});`,
    },
  },
  {
    name: "@utoo/web",
    tagline: t.packages.web.tagline,
    description: t.packages.web.description,
    color: "orange",
    gradient: "from-orange-500 to-amber-500",
    install: "ut i @utoo/web",
    highlight: {
      icon: Globe,
      title: t.packages.web.highlight.title,
      description: t.packages.web.highlight.description,
    },
    features: [
      {
        icon: Cloud,
        title: t.packages.web.features.browserInstall.title,
        description: t.packages.web.features.browserInstall.description,
      },
      {
        icon: HardDrive,
        title: t.packages.web.features.opfs.title,
        description: t.packages.web.features.opfs.description,
      },
      {
        icon: Cpu,
        title: t.packages.web.features.wasmEngine.title,
        description: t.packages.web.features.wasmEngine.description,
      },
      {
        icon: Workflow,
        title: t.packages.web.features.serviceWorker.title,
        description: t.packages.web.features.serviceWorker.description,
      },
    ],
    commands: [
      { cmd: "new Project({ cwd })", desc: t.packages.web.commands.newProject },
      { cmd: "project.install(lock)", desc: t.packages.web.commands.install },
      { cmd: "project.build()", desc: t.packages.web.commands.build },
      { cmd: "project.readFile(path)", desc: t.packages.web.commands.readFile },
      { cmd: "project.writeFile(path, content)", desc: t.packages.web.commands.writeFile },
    ],
    config: null,
    api: null,
  },
];
}

function QuickReference({
  pkg,
  t,
}: {
  pkg: ReturnType<typeof getPackages>[0];
  t: Translations;
}) {
  const [activeTab, setActiveTab] = useState<"commands" | "config" | "api">("commands");
  const hasConfig = pkg.config !== null;
  const hasApi = pkg.api !== null;
  const hasTabs = hasConfig || hasApi;

  return (
    <div className="rounded-xl overflow-hidden border border-border bg-card/50 backdrop-blur-xl shadow-2xl">
      <div className="px-3 py-2 bg-muted/30 border-b border-border flex items-center justify-between">
        {hasTabs ? (
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab("commands")}
              className={`text-xs px-2.5 py-1 rounded transition-colors ${
                activeTab === "commands"
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {t.common.cli}
            </button>
            {hasApi && (
              <button
                onClick={() => setActiveTab("api")}
                className={`text-xs px-2.5 py-1 rounded transition-colors ${
                  activeTab === "api"
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                API
              </button>
            )}
            {hasConfig && (
              <button
                onClick={() => setActiveTab("config")}
                className={`text-xs px-2.5 py-1 rounded transition-colors ${
                  activeTab === "config"
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                Umi
              </button>
            )}
          </div>
        ) : (
          <span className="text-xs font-medium text-muted-foreground ml-1">{t.common.quickReference}</span>
        )}
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full dark:bg-${pkg.color}-500/10 light:bg-${pkg.color}-500/5 dark:text-${pkg.color}-300 light:text-${pkg.color}-600 border border-${pkg.color}-500/20 font-mono`}
        >
          {pkg.name}
        </span>
      </div>
      <div className="p-4 font-mono text-xs sm:text-sm">
        {activeTab === "commands" && (
          <div className="space-y-3">
            {pkg.commands.map((item, index) => (
              <motion.div
                key={item.cmd}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-2">
                  <span className={`text-${pkg.color}-500 opacity-60 group-hover:opacity-100 transition-opacity`}>$</span>
                  <span className="text-foreground/80 group-hover:text-foreground transition-colors font-medium">{item.cmd}</span>
                </div>
                <span className="text-muted-foreground text-[10px] sm:text-xs text-right shrink-0">{item.desc}</span>
              </motion.div>
            ))}
          </div>
        )}
        {activeTab === "config" && pkg.config && (
          <div className="space-y-2">
            <div className="text-muted-foreground text-[10px] leading-relaxed">
              {pkg.config.builtInto}{" "}
              <a
                href="https://umijs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="dark:text-pink-400 light:text-pink-600 hover:opacity-80 transition-opacity underline decoration-pink-500/30"
              >
                Umi
              </a>
              {" "}{pkg.config.addConfig}
            </div>
            <div className="text-muted-foreground/50 text-[10px] font-mono">{pkg.config.file}</div>
            <pre
              className="text-foreground/90 whitespace-pre overflow-x-auto text-xs p-2 rounded bg-muted/20"
              dangerouslySetInnerHTML={{ __html: highlightJS(pkg.config.code) }}
            />
          </div>
        )}
        {activeTab === "api" && pkg.api && (
          <div>
            <div className="text-muted-foreground text-[10px] mb-2">
              {pkg.api.description}
            </div>
            <pre
              className="text-foreground/90 whitespace-pre overflow-x-auto text-xs"
              dangerouslySetInnerHTML={{ __html: highlightJS(pkg.api.code) }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function Features() {
  const { t } = useI18n();
  const packages = getPackages(t);

  return (
    <div id="packages" className="relative w-full">
      {/* Global Transition Fade */}
      <div className="section-fade-top z-10" />

      {packages.map((pkg, pkgIndex) => (
        <section
          key={pkg.name}
          className="relative py-16 md:py-24 overflow-hidden border-b border-white/[0.01] bg-transparent"
        >
          {/* Dynamic Backgrounds per Section */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
             {pkgIndex === 0 && (
               <>
                 <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-indigo-900/[0.04] rounded-full blur-[140px] opacity-25" />
                 <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-slate-800/[0.03] rounded-full blur-[120px] opacity-20" />
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.03),transparent_70%)]" />
               </>
             )}
             {pkgIndex === 1 && (
               <>
                 <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-pink-900/[0.03] rounded-full blur-[140px] opacity-20" />
                 <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-slate-800/[0.03] rounded-full blur-[120px] opacity-20" />
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(219,39,119,0.02),transparent_70%)]" />
                 <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
               </>
             )}
             {pkgIndex === 2 && (
               <>
                 <div className="absolute top-20 right-0 w-[1000px] h-[1000px] bg-amber-900/[0.03] rounded-full blur-[140px] opacity-20" />
                 <div className="absolute bottom-0 left-10 w-[800px] h-[800px] bg-slate-800/[0.03] rounded-full blur-[120px] opacity-20" />
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,119,6,0.015),transparent_70%)]" />
               </>
             )}
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Main layout grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 items-start">
                {/* Left column: Info & Highlight */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  {/* Package header */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.1] flex items-center justify-center shadow-2xl relative overflow-hidden group/icon`}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${pkg.gradient} opacity-20`} />
                          <div className={`relative`}>
                            {pkgIndex === 0 && (
                              <Terminal className={`w-7 h-7 text-indigo-400/90`} />
                            )}
                            {pkgIndex === 1 && <Box className={`w-7 h-7 text-${pkg.color}-400/90`} /> }
                            {pkgIndex === 2 && (
                              <Globe className={`w-7 h-7 text-${pkg.color}-400/90`} />
                            )}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold font-mono tracking-tight text-foreground opacity-90">
                            {pkg.name}
                          </h3>
                          <p className={`text-${pkg.color}-500/80 text-sm font-medium`}>{pkg.tagline}</p>
                        </div>
                      </div>

                      {/* Install command */}
                      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border font-mono text-xs text-muted-foreground ml-auto shadow-sm">
                        <span className="opacity-50">$</span>
                        <span className="text-foreground/80">{pkg.install}</span>
                        <CopyButton text={pkg.install} />
                      </div>
                    </div>
                    
                    {/* Mobile install command */}
                    <div className="flex sm:hidden items-center justify-between gap-2 px-3 py-2 rounded-lg bg-card border border-border font-mono text-xs text-muted-foreground mb-4 shadow-sm">
                      <div className="flex items-center gap-2 overflow-hidden">
                         <span className="opacity-50">$</span>
                         <span className="text-foreground/80 truncate">{pkg.install}</span>
                      </div>
                      <CopyButton text={pkg.install} />
                    </div>

                    <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Highlight box for key differentiators */}
                  {pkg.highlight && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="highlight-box"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center flex-shrink-0 mt-1 relative overflow-hidden shadow-sm`}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${pkg.gradient} opacity-10`} />
                          <pkg.highlight.icon className={`w-5 h-5 text-${pkg.color}-500/80 relative`} />
                        </div>
                        <div>
                          <h4 className={`text-base font-bold highlight-title-${pkg.color} mb-1 opacity-80`}>
                            {pkg.highlight.title}
                          </h4>
                          <p className="text-sm text-muted-foreground/60 leading-relaxed">
                            {pkg.highlight.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Right column: Quick Reference */}
                <div className="lg:col-span-5 sticky top-24 pt-2">
                  <div className="relative group">
                    <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${pkg.gradient} opacity-[0.03] group-hover:opacity-[0.06] blur-2xl transition-opacity duration-500`} />
                    <QuickReference pkg={pkg} t={t} />
                  </div>
                </div>
              </div>

              {/* Features grid - Full Width below */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {pkg.features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Card className="feature-card h-full bg-card border-border hover:bg-muted/5 transition-all duration-300 group shadow-lg">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded bg-background border border-border flex items-center justify-center flex-shrink-0 group-hover:bg-muted/50 transition-colors shadow-sm`}
                          >
                             <div className={`dark:text-${pkg.color}-500/60 light:text-${pkg.color}-600/60 group-hover:opacity-100 transition-opacity`}>
                                <feature.icon className="w-4 h-4" />
                             </div>
                          </div>
                          <CardTitle className="text-sm font-medium leading-tight text-muted-foreground group-hover:text-foreground transition-colors">
                            {feature.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-1">
                        <CardDescription className="text-[11px] text-muted-foreground group-hover:text-foreground/80 transition-colors leading-normal">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      ))}
    </div>
  );
}
