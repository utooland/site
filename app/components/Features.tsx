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
    comment: "text-slate-500",
    string: "text-amber-400",
    keyword: "text-pink-400",
    number: "text-purple-400",
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
    color: "purple",
    gradient: "from-purple-500 to-violet-500",
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
    ],
    commands: [
      { cmd: "ut install", desc: t.packages.utoo.commands.install },
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
        title: t.packages.web.features.wasmCompiler.title,
        description: t.packages.web.features.wasmCompiler.description,
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
    <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900 backdrop-blur">
      <div className="px-4 py-3 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
        {hasTabs ? (
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab("commands")}
              className={`text-sm px-3 py-1 rounded transition-colors ${
                activeTab === "commands"
                  ? "bg-white/10 text-white"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              {t.common.cli}
            </button>
            {hasConfig && (
              <button
                onClick={() => setActiveTab("config")}
                className={`text-sm px-3 py-1 rounded transition-colors ${
                  activeTab === "config"
                    ? "bg-white/10 text-white"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                umi
              </button>
            )}
            {hasApi && (
              <button
                onClick={() => setActiveTab("api")}
                className={`text-sm px-3 py-1 rounded transition-colors ${
                  activeTab === "api"
                    ? "bg-white/10 text-white"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                API
              </button>
            )}
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">{t.common.quickReference}</span>
        )}
        <span
          className={`text-xs px-2 py-0.5 rounded-full bg-${pkg.color}-500/20 text-${pkg.color}-300 font-mono`}
        >
          {pkg.name}
        </span>
      </div>
      <div className="p-4 font-mono text-sm">
        {activeTab === "commands" && (
          <div className="space-y-3">
            {pkg.commands.map((item, index) => (
              <motion.div
                key={item.cmd}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-green-400">$</span>
                  <span className="text-slate-200">{item.cmd}</span>
                </div>
                <span className="text-slate-500 text-xs">{item.desc}</span>
              </motion.div>
            ))}
          </div>
        )}
        {activeTab === "config" && pkg.config && (
          <div>
            <div className="text-slate-500 text-xs mb-3">
              {pkg.config.builtInto}{" "}
              <a
                href="https://umijs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-300 underline"
              >
                umi
              </a>
              {" "}{pkg.config.addConfig}
            </div>
            <div className="text-slate-500 text-xs mb-1">{pkg.config.file}</div>
            <pre
              className="text-slate-200 whitespace-pre"
              dangerouslySetInnerHTML={{ __html: highlightJS(pkg.config.code) }}
            />
          </div>
        )}
        {activeTab === "api" && pkg.api && (
          <div>
            <div className="text-slate-500 text-xs mb-3">
              {pkg.api.description}
            </div>
            <pre
              className="text-slate-200 whitespace-pre"
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
    <section id="packages" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-24">
          {packages.map((pkg, pkgIndex) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: pkgIndex * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Package header */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pkg.gradient} flex items-center justify-center`}
                    >
                      {pkgIndex === 0 && (
                        <Terminal className="w-6 h-6 text-white" />
                      )}
                      {pkgIndex === 1 && <Box className="w-6 h-6 text-white" />}
                      {pkgIndex === 2 && (
                        <Globe className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold font-mono">
                        {pkg.name}
                      </h3>
                      <p className={`text-${pkg.color}-400`}>{pkg.tagline}</p>
                    </div>
                  </div>

                  {/* Install command */}
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 font-mono text-sm text-slate-200">
                    <span className="text-slate-400">$</span>
                    <span className="text-slate-200">{pkg.install}</span>
                    <CopyButton text={pkg.install} />
                  </div>
                </div>
                <p className="text-muted-foreground max-w-2xl">
                  {pkg.description}
                </p>
              </div>

              {/* Highlight box for key differentiators */}
              {pkg.highlight && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                  className="highlight-box"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${pkg.gradient} flex items-center justify-center flex-shrink-0`}
                    >
                      <pkg.highlight.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className={`text-lg font-semibold highlight-title-${pkg.color} mb-1`}>
                        {pkg.highlight.title}
                      </h4>
                      <p className="text-muted-foreground">
                        {pkg.highlight.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Features grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pkg.features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="feature-card glass h-full">
                        <CardHeader className="pb-2">
                          <div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${pkg.gradient} flex items-center justify-center mb-2`}
                          >
                            <feature.icon className="w-5 h-5 text-white" />
                          </div>
                          <CardTitle className="text-base">
                            {feature.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-sm">
                            {feature.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Commands showcase */}
                <QuickReference pkg={pkg} t={t} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
