"use client";

import { SharedFooter } from "./SharedFooter";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-transparent -z-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-indigo-500/[0.03] blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <SharedFooter />
      </div>
    </footer>
  );
}
