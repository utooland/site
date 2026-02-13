"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Zap, ArrowRight, Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TerminalDemo } from "./TerminalDemo";
import { useEffect, useState, useRef } from "react";
import { useI18n } from "../i18n/context";
import { ChevronDown } from "lucide-react";

function GitHubButton() {
  const { t } = useI18n();
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/utooland/utoo")
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count !== undefined) {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, []);

  const formatStars = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return count.toString();
  };

  return (
    <Button
      size="lg"
      variant="outline"
      className="glass dark:border-white/20 light:border-black/10 dark:hover:bg-white/10 light:hover:bg-black/5 transition-colors"
      onClick={() =>
        window.open("https://github.com/utooland/utoo", "_blank")
      }
    >
      <Github className="mr-2 w-4 h-4" />
      {t.hero.github}
      {stars !== null && (
        <span className="ml-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-600 dark:text-yellow-300 text-xs">
          <Star className="w-3 h-3 fill-current" />
          {formatStars(stars)}
        </span>
      )}
    </Button>
  );
}

export function Hero() {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.9]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={containerRef}
      className="relative h-[130vh] flex items-start px-4 overflow-visible z-0"
    >
      <div className="sticky top-0 left-0 w-full h-screen flex items-center overflow-hidden">
        <motion.div
          style={{ scale, borderRadius, opacity }}
          className="absolute inset-0 z-0 overflow-hidden bg-background/80 backdrop-blur-3xl dark:border-white/5 light:border-black/5 shadow-2xl origin-center"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 gradient-bg" />

          {/* Animated background circles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-slate-800/10 rounded-full blur-[140px] animate-pulse-slow opacity-20" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-900/10 rounded-full blur-[140px] animate-pulse-slow opacity-15" />
          </div>
        </motion.div>

        <motion.div style={{ y }} className="relative z-10 max-w-[1600px] mx-auto w-full px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text content */}
            <div className="max-w-xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full glass text-xs font-medium border border-white/10"
            >
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-muted-foreground">{t.hero.badge}</span>
            </motion.div>

            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="hero-title text-6xl md:text-8xl font-extrabold mb-8 tracking-[-0.04em] leading-[0.9]"
            >
              <div className="flex items-baseline flex-wrap gap-x-6 gap-y-4 mb-4">
                <span className="gradient-text">{t.hero.title}</span>
                <div className="flex items-center gap-4">
                  <motion.span 
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="text-4xl md:text-6xl"
                  >
                    🌖
                  </motion.span>
                  <span className="text-sm md:text-base font-medium text-muted-foreground/20 font-mono tracking-[0.2em] mt-4 uppercase">
                    /juːtuː/
                  </span>
                </div>
              </div>
              <span className="text-5xl md:text-6xl text-foreground font-bold block mt-2 opacity-90">
                {t.hero.subtitle}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl text-muted-foreground/60 mb-10 leading-relaxed max-w-lg font-medium tracking-tight"
            >
              {t.hero.description}
            </motion.p>

            {/* Package badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <span className="px-4 py-1.5 rounded-full bg-indigo-500/5 text-indigo-400 dark:text-indigo-300 text-[11px] font-bold font-mono border border-indigo-500/20 backdrop-blur-sm">
                utoo
              </span>
              <span className="px-4 py-1.5 rounded-full bg-pink-500/5 text-pink-400 dark:text-pink-300 text-[11px] font-bold font-mono border border-pink-500/20 backdrop-blur-sm">
                @utoo/pack
              </span>
              <span className="px-4 py-1.5 rounded-full bg-orange-500/5 text-orange-400 dark:text-orange-300 text-[11px] font-bold font-mono border border-orange-500/20 backdrop-blur-sm">
                @utoo/web
              </span>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="group relative px-8 py-8 rounded-2xl bg-white text-black hover:bg-white/90 transition-all duration-300 overflow-hidden h-14 text-base font-bold shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
                onClick={() => {
                  document
                    .getElementById("packages")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="relative flex items-center">
                  {t.hero.explorePackages}
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
              <div className="scale-100">
                <div className="h-14">
                  <GitHubButton />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Terminal Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg mx-auto lg:max-w-none lg:mr-0 perspective-1000"
          >
            <div className="transform-gpu group-hover:rotate-y-2 transition-transform duration-700">
              <TerminalDemo />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40 font-bold">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-muted-foreground/20" />
          </motion.div>
        </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
