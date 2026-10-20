"use client";
import Link from "next/link"; import { MessageSquareQuote } from "lucide-react"; import { useSite } from "./SiteShell";
export default function Navbar() {
  const { s, openOrder } = useSite();
  return (
    <header className="fixed top-0 inset-x-0 z-40 h-16 bg-white/95 backdrop-blur border-b border-ash-200">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        <Link href="/" className="leading-none"><span className="block font-display text-lg sm:text-xl tracking-tight">{s.brand_name}</span><span className="block text-[11px] text-ash-500 mt-1">{s.brand_sub}</span></Link>
        <button onClick={() => openOrder()} className="inline-flex items-center gap-2 bg-black text-white px-4 py-2.5 text-sm font-semibold hover:bg-neutral-800 transition-colors"><MessageSquareQuote size={16} />{s.quote_button}</button>
      </div>
    </header>
  );
}
