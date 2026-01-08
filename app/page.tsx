"use client";

import dynamic from "next/dynamic";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";

const Playground = dynamic(
  () => import("./components/Playground").then((mod) => mod.Playground),
  {
    ssr: false,
    loading: () => (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Try <span className="gradient-text">Utoo</span> Now
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Loading playground...
            </p>
          </div>
          <div className="h-[600px] rounded-xl glass border-white/10 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-muted-foreground">Loading playground...</p>
            </div>
          </div>
        </div>
      </section>
    ),
  },
);

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
