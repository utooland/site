"use client";

import { ExternalLink, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useI18n } from "../i18n/context";

export function Playground() {
  const { t } = useI18n();

  return (
    <section id="playground" className="py-24 px-4 relative overflow-hidden bg-transparent border-b border-white/[0.01]">
      {/* Transitions */}
      <div className="section-fade-top" />

      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-amber-600/[0.08] rounded-full blur-[140px] opacity-25" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative glass-card p-12 md:p-20 rounded-[3rem] overflow-hidden border-white/[0.03]">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.02] to-transparent pointer-events-none" />
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center relative z-10"
        >
          <div className="flex flex-col items-center justify-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-[2rem] bg-orange-500/10 border border-orange-500/20 flex items-center justify-center relative shadow-2xl overflow-hidden group/pg">
               <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 opacity-20 group-hover/pg:opacity-40 transition-opacity" />
               <Globe className="w-10 h-10 text-orange-400 relative transition-transform duration-500 group-hover/pg:rotate-[360deg] group-hover/pg:scale-125" />
            </div>
            <h2 className="text-center">
              <span className="block text-sm font-black text-orange-500/60 mb-2 tracking-[0.4em] uppercase">Browser-Native</span>
              <span className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.9]">{t.playground.title}</span>
            </h2>
          </div>
          <p className="text-muted-foreground/50 text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-bold tracking-tight">
            {t.playground.description}
          </p>

          {/* Try Playground button */}
          <Button
            onClick={() => window.open("https://utoo-repl.vercel.app/", "_blank")}
            className="group relative px-12 py-10 rounded-[2rem] bg-orange-500 text-black hover:bg-orange-400 transition-all duration-500 overflow-hidden text-xl font-black shadow-[0_20px_50px_rgba(249,115,22,0.3)] hover:shadow-[0_20px_60px_rgba(249,115,22,0.4)] hover:-translate-y-1"
          >
            <span className="relative flex items-center">
              {t.playground.tryButton}
              <ExternalLink className="w-6 h-6 ml-4 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
