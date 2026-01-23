import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./styles.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Utoo - An Unified Toolchain For  Web Development",
  description:
    "A complete suite of tools for modern frontend development. Lightning fast package management, bundling, and browser-native builds.",
  keywords: ["bundler", "package manager", "turbopack", "rust", "webassembly", "typescript"],
  authors: [{ name: "Utoo Team" }],
  openGraph: {
    title: "Utoo - An Unified Toolchain For  Web Development",
    description:
      "A complete suite of tools for modern frontend development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
