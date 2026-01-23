"use client";

import { motion } from "framer-motion";
import { Zap, ArrowRight, Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TerminalDemo } from "./TerminalDemo";
import { useEffect, useState } from "react";
import { useI18n } from "../i18n/context";

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
      className="glass border-white/20 hover:bg-white/10"
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

  return (
    <section className="relative min-h-[60vh] flex items-center px-4 py-20 overflow-hidden md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-bg" />

      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-600/20 rounded-full blur-[100px] animate-pulse-slow" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
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
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hero-title text-4xl md:text-6xl font-bold mb-5 tracking-tight"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="gradient-text">{t.hero.title}</span>
                <span className="text-2xl md:text-3xl animate-bounce-slow">🌖</span>
                <span className="text-lg md:text-xl font-normal text-muted-foreground/60 font-mono self-end pb-1">
                  /juːtuː/
                </span>
              </div>
              <span className="text-3xl md:text-4xl text-muted-foreground block leading-tight">
                {t.hero.subtitle}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground/80 mb-6 leading-relaxed"
            >
              {t.hero.description}
            </motion.p>

            {/* Package badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              <span className="px-3 py-1 rounded-full badge-purple text-xs font-mono border border-purple-500/20">
                utoo
              </span>
              <span className="px-3 py-1 rounded-full badge-pink text-xs font-mono border border-pink-500/20">
                @utoo/pack
              </span>
              <span className="px-3 py-1 rounded-full badge-pink text-xs font-mono border border-pink-500/20">
                @utoo/pack-cli
              </span>
              <span className="px-3 py-1 rounded-full badge-orange text-xs font-mono border border-orange-500/20">
                @utoo/web
              </span>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button
                size="lg"
                className="btn-glow bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 h-10 px-6 text-sm"
                onClick={() => {
                  document
                    .getElementById("packages")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t.hero.explorePackages}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <div className="scale-90 origin-left sm:scale-100">
                <GitHubButton />
              </div>
            </motion.div>
          </div>

          {/* Right: Terminal Demo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-lg mx-auto lg:max-w-none lg:mr-0"
          >
            <TerminalDemo />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
