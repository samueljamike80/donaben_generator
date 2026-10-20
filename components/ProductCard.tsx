"use client";
import { ArrowUpRight, Zap } from "lucide-react"; import { naira, Product } from "@/lib/types"; import { useSite } from "./SiteShell";
export default function ProductCard({ p }: { p: Product }) {
  const { openOrder } = useSite();
  const go = () => { if (p.link_url) window.open(p.link_url, "_blank", "noopener"); };
  return (
    <article className="border border-ash-200 bg-white flex flex-col hover:border-black transition-colors">
      <div onClick={go} className={`aspect-square bg-ash-50 ${p.link_url ? "cursor-pointer" : ""}`}>
        {p.image_url ? <img src={p.image_url} alt={p.name} loading="lazy" className="w-full h-full object-contain p-2" /> : <div className="w-full h-full grid place-items-center text-ash-300"><Zap /></div>}
      </div>
      <div className="p-3 sm:p-4 flex flex-col flex-1 gap-1">
        <h3 onClick={go} className={`font-semibold text-sm sm:text-base leading-snug ${p.link_url ? "cursor-pointer" : ""}`}>{p.name}</h3>
        <p className="text-xs sm:text-sm text-ash-500">{p.kva}</p>
        <p className="font-bold text-base sm:text-lg mt-1">{naira(p.price)}</p>
        <button onClick={(e) => { e.stopPropagation(); openOrder(p.name); }} className="mt-auto pt-3">
          <span className="w-full inline-flex items-center justify-center gap-1.5 bg-black text-white py-2 text-xs sm:text-sm font-semibold hover:bg-neutral-700 transition-colors">Inquire Now <ArrowUpRight size={15} /></span>
        </button>
      </div>
    </article>
  );
}
