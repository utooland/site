"use client";

import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Playground } from "../components/Playground";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Features />
      <Playground />
      <Footer />
    </main>
  );
}
