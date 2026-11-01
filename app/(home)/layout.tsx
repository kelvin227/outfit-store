import type { Metadata } from "next";
import Link from "next/link";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { storeName } from "@/lib/store";
import "./globals.css";
import { DEFAULT_MIN_VERSION } from "node:tls";

const heading = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-heading" });
const body = Figtree({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: storeName,
  description: "Outfits and accessories. Order on WhatsApp.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
        <div>
        <div className="site-header">
          <Link href="/" className="brand" aria-label={`${storeName} home`}>
            <span className="brand-mark">O</span>
            <span className="brand-name">{storeName}</span>
          </Link>
          <nav className="header-nav" aria-label="Main navigation">
            <Link href="/#collection">Collection</Link>
            <Link href="/#about">Our promise</Link>
          </nav>
          <Link href="/#collection" className="header-action">Shop now <span aria-hidden="true">↗</span></Link>
        </div>
        <main>{children}</main>
        <div className="site-footer">
          <div>
            <Link href="/" className="brand footer-brand">
              <span className="brand-mark">O</span>
              <span className="brand-name">{storeName}</span>
            </Link>
            <p>Considered pieces for every occasion.</p>
          </div>
          <p className="footer-note">Found something you love? Order securely on WhatsApp.</p>
        </div>
        </div>
  );
}
