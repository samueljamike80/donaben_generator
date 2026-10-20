"use client";
import { useSite } from "@/components/SiteShell"; import Carousel from "@/components/Carousel"; import ProductCard from "@/components/ProductCard";
export default function Home() {
  const { s, products, loading } = useSite();
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 pt-6">
        <Carousel />
        <div className="py-10 sm:py-14 max-w-3xl">
          <h1 className="font-display text-4xl sm:text-6xl leading-[1.05]">{s.hero_title}</h1>
          <p className="mt-4 text-lg sm:text-xl font-medium">{s.hero_tagline}</p>
          <p className="mt-4 text-ash-500 leading-relaxed max-w-2xl">{s.hero_intro}</p>
        </div>
      </section>
      <section className="bg-ash-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display text-2xl sm:text-3xl">{s.catalog_title}</h2>
          <p className="text-ash-500 mt-1 mb-6">{s.catalog_intro}</p>
          {loading ? <p className="text-ash-500">Loading generators</p> : products.length === 0 ? <p className="text-ash-500">No generators yet. Add one from the admin panel.</p> :
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">{products.map((p) => <ProductCard key={p.id} p={p} />)}</div>}
        </div>
      </section>
    </>
  );
}
