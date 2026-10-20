"use client";
import { MessageCircle, Facebook, Youtube, ExternalLink } from "lucide-react"; import { useSite } from "./SiteShell";
export default function FloatingButtons() {
  const { s } = useSite();
  const wa = `https://wa.me/${s.whatsapp_number.replace(/\D/g, "")}`;
  const items = [
    { href: "https://wa.me/2348037983246", icon: <MessageCircle size={20} />, label: "Chat on WhatsApp", bg: "#25D366" },
    { href: "https://web.facebook.com/profile.php?id=100081202578235", icon: <Facebook size={20} />, label: "Facebook page", bg: "#1877F2" },
    { href: "https://www.youtube.com/@samuelazolo9592", icon: <Youtube size={20} />, label: "YouTube channel", bg: "#FF0000" },
    { href: "https://www.fawde.com/6dm3-platform-products/", icon: <ExternalLink size={20} />, label: "Fawde Store", bg: "#000000" },
  ];
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-30 flex flex-col">
      {items.map((it) => (
        <a key={it.label} href={it.href} target="_blank" rel="noreferrer" aria-label={it.label} title={it.label} style={{ backgroundColor: it.bg }}
          className="group flex items-center justify-end text-white border-b border-white/30 first:rounded-tl last:rounded-bl last:border-b-0 hover:brightness-110 transition">
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs group-hover:max-w-[210px] group-hover:px-3 transition-all duration-200 hidden md:block">{it.label}</span>
          <span className="p-3">{it.icon}</span>
        </a>))}
    </div>
  );
}
