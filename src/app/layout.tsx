import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Serra Multimarcas — Seminovos Selecionados em Jundiaí / SP",
  description:
    "Showroom de veículos seminovos com procedência garantida na Av. Nove de Julho, Jundiaí - SP. Atendimento imediato via WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
