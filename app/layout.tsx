import type { Metadata } from "next";
import Link from "next/link";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { storeName } from "@/lib/store";
import "./globals.css";

const heading = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-heading" });
const body = Figtree({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: storeName,
  description: "Outfits and accessories. Order on WhatsApp.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
