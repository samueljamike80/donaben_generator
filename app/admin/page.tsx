"use client";
import { useState } from "react"; import { Trash2, Pencil, Upload, LogOut, Plus } from "lucide-react";
import { supabase } from "@/lib/supabase"; import { ADMIN_PASSWORD, DEFAULT_SETTINGS, Product, naira } from "@/lib/types"; import { useSite } from "@/components/SiteShell";
const blank = { name: "", kva: "", price: 0, image_url: "", link_url: "", specs: "", sort: 0 };
const longKeys = ["hero_intro", "addresses", "hero_tagline"];
export default function Admin() {
  const { s, products, reload } = useSite();
  const [authed, setAuthed] = useState(false); const [pw, setPw] = useState(""); const [err, setErr] = useState("");
  const [tab, setTab] = useState<"products" | "site">("products");
  const [form, setForm] = useState<any>(blank); const [busy, setBusy] = useState(false); const [msg, setMsg] = useState("");
  const [draft, setDraft] = useState<Record<string, string> | null>(null);
  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 3000); };
  if (!authed) return (
    <div className="max-w-sm mx-auto px-4 py-24">
      <h1 className="font-display text-2xl mb-4">Admin access</h1>
      <form onSubmit={(e) => { e.preventDefault(); pw === ADMIN_PASSWORD ? setAuthed(true) : setErr("Incorrect password."); }} className="space-y-3">
        <input type="password" className="inp" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} />
        {err && <p className="text-sm">{err}</p>}
        <button className="w-full bg-black text-white py-2.5 font-semibold">Sign in</button>
      </form>
    </div>);
  const upload = async (file: File) => {
    setBusy(true);
    const path = `${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`;
    const { error } = await supabase.storage.from("products").upload(path, file);
    if (error) flash("Upload failed: " + error.message);
    else setForm((f: any) => ({ ...f, image_url: supabase.storage.from("products").getPublicUrl(path).data.publicUrl }));
    setBusy(false);
  };
  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true);
    const { id, created_at, ...row } = form; row.price = Number(row.price) || 0; row.sort = Number(row.sort) || 0;
    const { error } = id ? await supabase.from("products").update(row).eq("id", id) : await supabase.from("products").insert(row);
    setBusy(false); if (error) return flash("Save failed: " + error.message);
    setForm(blank); await reload(); flash("Product saved.");
  };
  const del = async (p: Product) => { if (!confirm(`Delete ${p.name}?`)) return; await supabase.from("products").delete().eq("id", p.id); await reload(); flash("Product deleted."); };
  const saveSettings = async () => {
    setBusy(true); const rows = Object.entries(draft || {}).map(([key, value]) => ({ key, value }));
    const { error } = await supabase.from("settings").upsert(rows); setBusy(false);
    if (error) return flash("Save failed: " + error.message); await reload(); flash("Site content saved.");
  };
  const d = draft || s;
  const field = (k: string, v: string, on: (v: string) => void) => longKeys.includes(k) ? <textarea rows={3} className="inp" value={v} onChange={(e) => on(e.target.value)} /> : <input className="inp" value={v} onChange={(e) => on(e.target.value)} />;
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6"><h1 className="font-display text-2xl">Admin panel</h1>
        <button onClick={() => setAuthed(false)} className="inline-flex items-center gap-1.5 text-sm border border-ash-300 px-3 py-1.5"><LogOut size={14} />Sign out</button></div>
      <div className="flex gap-2 mb-6">{(["products", "site"] as const).map((t) => <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-semibold border ${tab === t ? "bg-black text-white border-black" : "border-ash-300"}`}>{t === "products" ? "Generators" : "Site content"}</button>)}</div>
      {msg && <p className="mb-4 text-sm bg-ash-100 px-3 py-2">{msg}</p>}
      {tab === "products" ? (<>
        <form onSubmit={saveProduct} className="border border-ash-200 p-4 grid sm:grid-cols-2 gap-3 mb-8">
          <h2 className="sm:col-span-2 font-semibold">{form.id ? "Edit generator" : "Add generator"}</h2>
          <input required className="inp" placeholder="Model name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="inp" placeholder="KVA rating (e.g. 30 KVA)" value={form.kva} onChange={(e) => setForm({ ...form, kva: e.target.value })} />
          <input type="number" className="inp" placeholder="Price in naira" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <input type="number" className="inp" placeholder="Display order" value={form.sort} onChange={(e) => setForm({ ...form, sort: e.target.value })} />
          <input className="inp sm:col-span-2" placeholder="External link when card is tapped (optional)" value={form.link_url} onChange={(e) => setForm({ ...form, link_url: e.target.value })} />
          <textarea rows={3} className="inp sm:col-span-2" placeholder="Specifications" value={form.specs} onChange={(e) => setForm({ ...form, specs: e.target.value })} />
          <div className="sm:col-span-2 flex items-center gap-3">
            <label className="inline-flex items-center gap-2 border border-ash-300 px-3 py-2 text-sm cursor-pointer"><Upload size={14} />Upload image<input type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} /></label>
            {form.image_url && <img src={form.image_url} alt="" className="h-14 w-14 object-contain border border-ash-200" />}
          </div>
          <div className="sm:col-span-2 flex gap-2"><button disabled={busy} className="inline-flex items-center gap-1.5 bg-black text-white px-5 py-2.5 text-sm font-semibold disabled:opacity-50"><Plus size={14} />{form.id ? "Save changes" : "Add generator"}</button>
            {form.id && <button type="button" onClick={() => setForm(blank)} className="border border-ash-300 px-4 text-sm">Cancel</button>}</div>
        </form>
        <ul className="divide-y divide-ash-200 border border-ash-200">{products.map((p) => (
          <li key={p.id} className="flex items-center gap-3 p-3">
            {p.image_url ? <img src={p.image_url} alt="" className="h-12 w-12 object-contain bg-ash-50" /> : <div className="h-12 w-12 bg-ash-100" />}
            <div className="flex-1 min-w-0"><p className="font-semibold truncate">{p.name}</p><p className="text-xs text-ash-500">{p.kva} · {naira(p.price)}</p></div>
            <button aria-label="Edit" onClick={() => { setForm(p); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="p-2 border border-ash-300"><Pencil size={14} /></button>
            <button aria-label="Delete" onClick={() => del(p)} className="p-2 border border-ash-300"><Trash2 size={14} /></button>
          </li>))}{!products.length && <li className="p-4 text-sm text-ash-500">No generators yet.</li>}</ul>
      </>) : (<div className="space-y-4">
        {Object.keys(DEFAULT_SETTINGS).map((k) => (<label key={k} className="block"><span className="text-xs font-semibold block mb-1">{k.replace(/_/g, " ")}</span>{field(k, d[k] ?? "", (v) => setDraft({ ...d, [k]: v }))}</label>))}
        <button disabled={busy || !draft} onClick={saveSettings} className="bg-black text-white px-5 py-2.5 text-sm font-semibold disabled:opacity-40">Save site content</button>
      </div>)}
    </div>);
}
