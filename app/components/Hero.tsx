"use client";

import { motion } from "framer-motion";
import { Zap, Package, Cpu, ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-bg" />

      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass text-sm"
        >
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-muted-foreground">
            Powered by Rust & WebAssembly
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hero-title text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="gradient-text">Lightning Fast</span>
          <br />
          Web Bundler
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hero-subtitle text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          Build modern web applications with blazing fast compilation.
          Experience instant feedback with Utoo's next-generation bundling
          technology.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Button
            size="lg"
            className="btn-glow bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
            onClick={() => {
              document
                .getElementById("playground")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Try Playground
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="glass border-white/20 hover:bg-white/10"
            onClick={() =>
              window.open("https://github.com/AntdFarm/utoo", "_blank")
            }
          >
            <Github className="mr-2 w-4 h-4" />
            View on GitHub
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">10x</div>
            <div className="text-sm text-muted-foreground">Faster Build</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">0ms</div>
            <div className="text-sm text-muted-foreground">HMR Delay</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">100%</div>
            <div className="text-sm text-muted-foreground">Compatible</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
