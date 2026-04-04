import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "PocketCurb",
  description: "Decision-first personal finance clarity with Safe-to-Spend, event intelligence, and forward-looking cash flow."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-web-canvas text-slate-950 antialiased">{children}</body>
    </html>
  );
}
