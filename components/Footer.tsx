"use client";
import { Facebook, Youtube, MapPin } from "lucide-react"; import { useSite } from "./SiteShell";
export default function Footer() {
  const { s } = useSite();
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-3">
        <div><p className="font-display text-xl">{s.brand_name}</p><p className="text-sm text-ash-300 mt-2">{s.brand_sub}</p></div>
        <div className="space-y-2">{s.addresses.split("\n").filter(Boolean).map((a, i) => (<p key={i} className="flex gap-2 text-sm text-ash-200"><MapPin size={16} className="mt-0.5 shrink-0" />{a}</p>))}</div>
        <div className="flex gap-3 md:justify-end items-start">
          <a href="https://web.facebook.com/profile.php?id=100081202578235" target="_blank" rel="noreferrer" aria-label="Facebook" style={{ backgroundColor: "#1877F2" }} className="p-2.5 text-white hover:brightness-110 transition"><Facebook size={18} /></a>
          <a href="https://www.youtube.com/@samuelazolo9592" target="_blank" rel="noreferrer" aria-label="YouTube" style={{ backgroundColor: "#FF0000" }} className="p-2.5 text-white hover:brightness-110 transition"><Youtube size={18} /></a>
        </div>
      </div>
      <div className="border-t border-white/15 py-5 text-center text-xs text-ash-300 px-4">{s.footer_text}</div>
    </footer>
  );
}
