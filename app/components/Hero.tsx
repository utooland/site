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
    <section className="relative min-h-[70vh] flex items-center px-4 pt-16 pb-12 overflow-hidden md:pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-bg" />

      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full glass text-sm"
            >
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-muted-foreground">{t.hero.badge}</span>
            </motion.div>

            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hero-title text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="gradient-text">{t.hero.title}</span>
              <span className="ml-3 text-2xl md:text-3xl">🌖</span>
              <span className="ml-2 text-lg md:text-xl font-normal text-muted-foreground/70">
                /juːtuː/
              </span>
              <br />
              <span className="text-3xl md:text-4xl text-muted-foreground">
                {t.hero.subtitle}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8 max-w-lg"
            >
              {t.hero.description}
            </motion.p>

            {/* Package badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <span className="px-3 py-1 rounded-full badge-purple text-sm font-mono">
                utoo
              </span>
              <span className="px-3 py-1 rounded-full badge-pink text-sm font-mono">
                @utoo/pack
              </span>
              <span className="px-3 py-1 rounded-full badge-pink text-sm font-mono">
                @utoo/pack-cli
              </span>
              <span className="px-3 py-1 rounded-full badge-orange text-sm font-mono">
                @utoo/web
              </span>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="btn-glow bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                onClick={() => {
                  document
                    .getElementById("packages")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t.hero.explorePackages}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <GitHubButton />
            </motion.div>
          </div>

          {/* Right: Terminal Demo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <TerminalDemo />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
