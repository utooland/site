import { Providers } from "../providers";
import { Header } from "../components/Header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[hsl(var(--frame-bg))] p-2 sm:p-4 lg:p-6 transition-colors duration-300">
      <div className="flex-1 flex flex-col bg-background rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] border border-border shadow-xl relative overflow-hidden">
        <Providers>
          <Header />
          {children}
        </Providers>
      </div>
    </div>
  );
}
