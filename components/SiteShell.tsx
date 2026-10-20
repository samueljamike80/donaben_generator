"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { DEFAULT_SETTINGS, Product, Settings } from "@/lib/types";
import Navbar from "./Navbar"; import Footer from "./Footer"; import FloatingButtons from "./FloatingButtons"; import OrderModal from "./OrderModal";
interface Ctx { s: Settings; products: Product[]; loading: boolean; openOrder: (p?: string) => void; reload: () => void; }
const C = createContext<Ctx>(null as unknown as Ctx);
export const useSite = () => useContext(C);
export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [s, setS] = useState<Settings>(DEFAULT_SETTINGS);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; product: string }>({ open: false, product: "" });
  const reload = useCallback(async () => {
    const [p, st] = await Promise.all([supabase.from("products").select("*").order("sort").order("created_at"), supabase.from("settings").select("*")]);
    if (p.data) setProducts(p.data as Product[]);
    if (st.data) { const m: Settings = { ...DEFAULT_SETTINGS }; st.data.forEach((r: any) => { if (r.value !== null && r.value !== "") m[r.key] = r.value; }); setS(m); }
    setLoading(false);
  }, []);
  useEffect(() => { reload(); }, [reload]);
  return (
    <C.Provider value={{ s, products, loading, reload, openOrder: (p = "") => setModal({ open: true, product: p }) }}>
      <Navbar /><main className="pt-16 min-h-screen">{children}</main><Footer /><FloatingButtons />
      {modal.open && <OrderModal initialProduct={modal.product} onClose={() => setModal({ open: false, product: "" })} />}
    </C.Provider>
  );
}
