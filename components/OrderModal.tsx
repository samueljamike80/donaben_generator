"use client";
import { useState } from "react"; import { X, Send } from "lucide-react"; import { useSite } from "./SiteShell";
const L = ({ t, children }: { t: string; children: React.ReactNode }) => (<label className="block"><span className="text-xs font-semibold mb-1 block">{t}</span>{children}</label>);
export default function OrderModal({ initialProduct, onClose }: { initialProduct: string; onClose: () => void }) {
  const { s, products } = useSite();
  const [f, setF] = useState({ name: "", phone: "", address: "", state: "", city: "", gender: "", product: initialProduct, quantity: "1", comments: "" });
  const set = (k: string) => (e: React.ChangeEvent<any>) => setF({ ...f, [k]: e.target.value });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `*New Order Request*\n\nFull Name: ${f.name}\nPhone: ${f.phone}\nAddress: ${f.address}\nState: ${f.state}\nCity: ${f.city}\nGender: ${f.gender}\nProduct: ${f.product}\nQuantity: ${f.quantity}\nComments: ${f.comments || "None"}`;
    window.open(`https://wa.me/2348037983246${s.whatsapp_number.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`, "_blank");
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <form onSubmit={submit} onClick={(e) => e.stopPropagation()} className="bg-white w-full sm:max-w-lg max-h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ash-200 sticky top-0 bg-white">
          <h2 className="font-display text-lg">{s.modal_title}</h2>
          <button type="button" onClick={onClose} aria-label="Close"><X size={20} /></button>
        </div>
        <div className="p-5 grid grid-cols-2 gap-3">
          <div className="col-span-2"><L t="Full Name"><input required className="inp" value={f.name} onChange={set("name")} /></L></div>
          <div className="col-span-2"><L t="Phone Number"><input required type="tel" className="inp" value={f.phone} onChange={set("phone")} /></L></div>
          <div className="col-span-2"><L t="Address"><input required className="inp" value={f.address} onChange={set("address")} /></L></div>
          <L t="State"><input required className="inp" value={f.state} onChange={set("state")} /></L>
          <L t="City"><input required className="inp" value={f.city} onChange={set("city")} /></L>
          <L t="Gender"><select required className="inp" value={f.gender} onChange={set("gender")}><option value="">Select</option><option>Male</option><option>Female</option><option>Prefer not to say</option></select></L>
          <L t="Quantity"><input required type="number" min={1} className="inp" value={f.quantity} onChange={set("quantity")} /></L>
          <div className="col-span-2"><L t="Selected Product"><select required className="inp" value={f.product} onChange={set("product")}><option value="">Select a generator</option>{products.map((p) => <option key={p.id}>{p.name}</option>)}{f.product && !products.some((p) => p.name === f.product) && <option>{f.product}</option>}</select></L></div>
          <div className="col-span-2"><L t="Additional Comments"><textarea rows={3} className="inp" value={f.comments} onChange={set("comments")} /></L></div>
          <button className="col-span-2 inline-flex items-center justify-center gap-2 bg-black text-white py-3 font-semibold hover:bg-neutral-700 transition-colors"><Send size={16} />Order Now</button>
        </div>
      </form>
    </div>
  );
}
