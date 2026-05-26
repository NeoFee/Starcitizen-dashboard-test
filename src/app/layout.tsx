import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UEE News Network — Star Citizen Dashboard",
  description:
    "Real-time Star Citizen news aggregator: RSI Comm-Link, Reddit, Wiki, YouTube & server status.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#020409] text-slate-100">
        {children}
      </body>
    </html>
  );
}
