"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Gauge, Rocket, RefreshCcw, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useI18n } from "../i18n/context";

const benchmarkCases = [
  {
    caseName: "react-1k",
    modules: "1,000 components",
    startup: { tool: "Rsbuild", value: "1529ms" },
    build: { tool: "Vite (Rolldown)", value: "628ms" },
    hmr: { tool: "Rspack CLI", value: "107ms" },
  },
  {
    caseName: "react-5k",
    modules: "5,000 components",
    startup: { tool: "Rsbuild", value: "1346ms" },
    build: { tool: "Vite (Rolldown)", value: "1921ms" },
    hmr: { tool: "Farm", value: "85ms" },
  },
  {
    caseName: "react-10k",
    modules: "10,000 components",
    startup: { tool: "Rsbuild", value: "1188ms" },
    build: { tool: "Vite (Rolldown)", value: "3283ms" },
    hmr: { tool: "Vite (Rolldown)", value: "94ms" },
  },
] as const;

const benchmarkHighlights = [
  {
    key: "startup",
    icon: Rocket,
    accent: "from-sky-500/25 via-cyan-500/10 to-transparent",
    tool: "Rsbuild",
    value: "1188ms",
  },
  {
    key: "build",
    icon: Gauge,
    accent: "from-emerald-500/25 via-lime-500/10 to-transparent",
    tool: "Vite (Rolldown)",
    value: "628ms",
  },
  {
    key: "hmr",
    icon: RefreshCcw,
    accent: "from-amber-500/25 via-orange-500/10 to-transparent",
    tool: "Farm",
    value: "85ms",
  },
] as const;

export function Benchmark() {
  const { t } = useI18n();

  return (
    <section id="benchmark" className="relative px-4 py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-12 h-64 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_55%)]" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.09),transparent_55%)]" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">
            <Trophy className="h-3.5 w-3.5" />
            <span>{t.benchmark.badge}</span>
          </div>
          <h2 className="mt-6 text-4xl font-black tracking-[-0.04em] text-foreground md:text-6xl">
            {t.benchmark.title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground/80 md:text-xl">
            {t.benchmark.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-10 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]"
        >
          <Card className="glass-card border-white/10 bg-transparent">
            <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground/60">
                  {t.benchmark.sourceLabel}
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {t.benchmark.sourceText}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground/60">
                  {t.benchmark.casesLabel}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {benchmarkCases.map((item) => (
                    <span
                      key={item.caseName}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-foreground/80"
                    >
                      {item.caseName}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-stretch">
            <Button
              size="lg"
              variant="outline"
              className="h-auto w-full justify-between rounded-[1.75rem] border-white/10 bg-white/5 px-6 py-5 text-left text-base text-foreground hover:bg-white/10"
              onClick={() =>
                window.open(
                  "https://github.com/utooland/build-tools-performance",
                  "_blank",
                )
              }
            >
              <span>{t.benchmark.cta}</span>
              <ArrowUpRight className="h-5 w-5 shrink-0" />
            </Button>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {benchmarkHighlights.map((item, index) => {
            const Icon = item.icon;
            const copy = t.benchmark.highlights[item.key];

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="glass-card relative h-full overflow-hidden border-white/10 bg-transparent">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.accent}`} />
                  <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="rounded-2xl border border-white/10 bg-white/8 p-3">
                        <Icon className="h-5 w-5 text-foreground" />
                      </div>
                      <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
                        {item.tool}
                      </span>
                    </div>
                    <CardTitle className="pt-6 text-3xl font-black tracking-[-0.03em] md:text-4xl">
                      {item.value}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10 space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">{copy.title}</h3>
                    <p className="text-sm leading-7 text-muted-foreground/80">
                      {copy.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-12"
        >
          <Card className="glass-card overflow-hidden border-white/10 bg-transparent">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="text-2xl font-bold">{t.benchmark.tableTitle}</CardTitle>
              <p className="text-sm leading-7 text-muted-foreground/75">
                {t.benchmark.tableDescription}
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left">
                  <thead className="bg-white/5">
                    <tr className="text-sm uppercase tracking-[0.2em] text-muted-foreground/60">
                      <th className="px-6 py-4 font-medium">{t.benchmark.columns.case}</th>
                      <th className="px-6 py-4 font-medium">{t.benchmark.columns.startup}</th>
                      <th className="px-6 py-4 font-medium">{t.benchmark.columns.build}</th>
                      <th className="px-6 py-4 font-medium">{t.benchmark.columns.hmr}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {benchmarkCases.map((item) => (
                      <tr key={item.caseName} className="border-t border-white/10">
                        <td className="px-6 py-5">
                          <div className="font-semibold text-foreground">{item.caseName}</div>
                          <div className="mt-1 text-sm text-muted-foreground/70">
                            {item.modules}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <Metric tool={item.startup.tool} value={item.startup.value} />
                        </td>
                        <td className="px-6 py-5">
                          <Metric tool={item.build.tool} value={item.build.value} />
                        </td>
                        <td className="px-6 py-5">
                          <Metric tool={item.hmr.tool} value={item.hmr.value} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <p className="mt-5 text-sm leading-7 text-muted-foreground/65">
          {t.benchmark.note}
        </p>
      </div>
    </section>
  );
}

function Metric({ tool, value }: { tool: string; value: string }) {
  return (
    <div className="space-y-1">
      <div className="text-base font-semibold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground/70">{tool}</div>
    </div>
  );
}
