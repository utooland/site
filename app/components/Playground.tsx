"use client";

import { ExternalLink, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useI18n } from "../i18n/context";

export function Playground() {
  const { t } = useI18n();

  return (
    <section id="playground" className="py-24 px-4 relative overflow-hidden bg-[#010102] border-b border-white/[0.01]">
      {/* Transitions */}
      <div className="section-fade-top" />

      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-900/[0.015] rounded-full blur-[120px] opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#020203] border border-white/[0.05] flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5" />
               <Globe className="w-7 h-7 text-orange-500/60 relative" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              <span className="font-mono text-orange-500/70">@utoo/web</span>{" "}
              <span className="text-slate-400">{t.playground.title}</span>
            </h2>
          </div>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            {t.playground.description}
          </p>

          {/* Try Playground button */}
          <Button
            onClick={() => window.open("https://utoo-repl.vercel.app/", "_blank")}
            className="group relative px-6 py-3 rounded-xl bg-[#020203] border border-orange-500/20 text-orange-500/60 hover:text-orange-400 transition-all duration-300 overflow-hidden text-sm"
          >
            <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/5 transition-colors" />
            <span className="relative flex items-center font-medium">
              {t.playground.tryButton}
              <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
