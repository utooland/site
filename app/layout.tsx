import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./styles.css";
import { Providers } from "./providers";
import { Header } from "./components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Utoo - Lightning Fast Web Bundler",
  description:
    "Build modern web applications with blazing fast compilation. Powered by Rust and WebAssembly for instant feedback.",
  keywords: ["bundler", "webpack", "vite", "rust", "webassembly", "typescript"],
  authors: [{ name: "Utoo Team" }],
  openGraph: {
    title: "Utoo - Lightning Fast Web Bundler",
    description:
      "Build modern web applications with blazing fast compilation.",
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
          <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              color: "hsl(var(--foreground))",
            },
          }}
        />
        </Providers>
      </body>
    </html>
  );
}
