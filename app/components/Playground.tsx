"use client";

import { ExternalLink, Globe, Cloud, Cpu, FolderTree } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useI18n } from "../i18n/context";

export function Playground() {
  const { t } = useI18n();

  return (
    <section id="playground" className="py-20 px-4 relative overflow-hidden">
      {/* Transitions */}
      <div className="section-fade-top" />
      <div className="section-divider opacity-50" />

      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="font-mono text-orange-400">@utoo/web</span>{" "}
              <span className="text-muted-foreground">{t.playground.title}</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            {t.playground.description}
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
              <Cloud className="w-4 h-4 text-orange-400" />
              <span>{t.playground.features.isomorphicInstall}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
              <Cpu className="w-4 h-4 text-orange-400" />
              <span>{t.playground.features.wasmCompiler}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
              <FolderTree className="w-4 h-4 text-orange-400" />
              <span>{t.playground.features.opfsFileSystem}</span>
            </div>
          </div>

          {/* Try Playground button */}
          <Button
            onClick={() => window.open("https://utoo-repl.vercel.app/", "_blank")}
            className="btn-glow bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-0"
          >
            {t.playground.tryButton}
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="p-6 rounded-xl glass">
            <div className="text-2xl font-bold text-orange-400 mb-2">1</div>
            <h4 className="font-semibold mb-2">{t.playground.steps.step1.title}</h4>
            <p className="text-sm text-muted-foreground">
              {t.playground.steps.step1.description}
            </p>
          </div>
          <div className="p-6 rounded-xl glass">
            <div className="text-2xl font-bold text-orange-400 mb-2">2</div>
            <h4 className="font-semibold mb-2">{t.playground.steps.step2.title}</h4>
            <p className="text-sm text-muted-foreground">
              {t.playground.steps.step2.description}
            </p>
          </div>
          <div className="p-6 rounded-xl glass">
            <div className="text-2xl font-bold text-orange-400 mb-2">3</div>
            <h4 className="font-semibold mb-2">{t.playground.steps.step3.title}</h4>
            <p className="text-sm text-muted-foreground">
              {t.playground.steps.step3.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
