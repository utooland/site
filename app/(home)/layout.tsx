import { Providers } from "../providers";
import { Header } from "../components/Header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Header />
      {children}
    </Providers>
  );
}
