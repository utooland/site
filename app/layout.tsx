import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./styles.css";
import { Providers } from "./providers";
import { Header } from "./components/Header";

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
  title: "Utoo - Unified Frontend Toolchain",
  description:
    "A complete suite of tools for modern frontend development. Lightning fast package management, bundling, and browser-native builds.",
  keywords: ["bundler", "package manager", "turbopack", "rust", "webassembly", "typescript"],
  authors: [{ name: "Utoo Team" }],
  openGraph: {
    title: "Utoo - Unified Frontend Toolchain",
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
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
