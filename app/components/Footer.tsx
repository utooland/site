"use client";

import { SharedFooter } from "./SharedFooter";

export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <SharedFooter />
      </div>
    </footer>
  );
}
