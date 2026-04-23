"use client";

import { Hero } from "../components/Hero";
import { Benchmark } from "../components/Benchmark";
import { Features } from "../components/Features";
import { Playground } from "../components/Playground";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Benchmark />
      <Features />
      <Playground />
      <Footer />
    </main>
  );
}
