import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/lenis-provider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const title = "Rafael Mello™ - Desenvolvedor Web";
const description =
  "Desenvolvedor Front-End especializado em landing pages, sites institucionais e sistemas customizados. Solicite seu orçamento!";

export const metadata: Metadata = {
  metadataBase: new URL("https://rafaelmello.site"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://rafaelmello.site",
    siteName: "Rafael Mello",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-br" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
