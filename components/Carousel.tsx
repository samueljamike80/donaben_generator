"use client";
import { useEffect, useState } from "react"; import { ChevronLeft, ChevronRight } from "lucide-react";
import { naira } from "@/lib/types"; import { useSite } from "./SiteShell";
export default function Carousel() {
  const { products, openOrder } = useSite(); const [i, setI] = useState(0); const [paused, setPaused] = useState(false);
  const list = products.filter((p) => p.image_url); const n = list.length;
  useEffect(() => { if (n < 2 || paused) return; const t = setInterval(() => setI((x) => (x + 1) % n), 4500); return () => clearInterval(t); }, [n, paused]);
  if (!n) return <div className="aspect-[16/7] bg-ash-100 grid place-items-center text-ash-500 text-sm">Add products in the admin panel to feature them here.</div>;
  return (
    <div className="relative overflow-hidden bg-ash-100 aspect-[16/9] sm:aspect-[16/7]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="flex h-full transition-transform duration-700 ease-out" style={{ transform: `translateX(-${i * 100}%)` }}>
        {list.map((p) => (
          <div key={p.id} className="relative w-full h-full shrink-0 cursor-pointer" onClick={() => (p.link_url ? window.open(p.link_url, "_blank") : openOrder(p.name))}>
            <img src={p.image_url} alt={p.name} className="w-full h-full object-contain p-4 sm:p-8" />
            <div className="absolute left-0 bottom-0 bg-black text-white px-4 py-3"><p className="font-semibold text-sm sm:text-base">{p.name}</p><p className="text-xs text-ash-300">{p.kva} · {naira(p.price)}</p></div>
          </div>))}
      </div>
      {n > 1 && (<>
        <button aria-label="Previous" onClick={() => setI((i - 1 + n) % n)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white border border-ash-300 p-2 hover:bg-black hover:text-white transition-colors"><ChevronLeft size={18} /></button>
        <button aria-label="Next" onClick={() => setI((i + 1) % n)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border border-ash-300 p-2 hover:bg-black hover:text-white transition-colors"><ChevronRight size={18} /></button>
        <div className="absolute bottom-3 right-3 flex gap-1.5">{list.map((_, k) => (<button key={k} aria-label={`Slide ${k + 1}`} onClick={() => setI(k)} className={`h-1.5 transition-all ${k === i ? "w-6 bg-black" : "w-3 bg-black/30"}`} />))}</div>
      </>)}
    </div>
  );
}
