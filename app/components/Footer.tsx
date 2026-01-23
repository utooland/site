"use client";

import { SharedFooter } from "./SharedFooter";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.02] py-8 px-4 relative overflow-hidden bg-[#010102]">
      <div className="absolute inset-0 bg-transparent -z-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-purple-900/[0.02] blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="max-w-6xl mx-auto">
        <SharedFooter />
      </div>
    </footer>
  );
}
