"use client";

import { SharedFooter } from "./SharedFooter";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm -z-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="max-w-6xl mx-auto">
        <SharedFooter />
      </div>
    </footer>
  );
}
