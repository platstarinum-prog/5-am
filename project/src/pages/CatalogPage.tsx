import { useState } from 'react';
import ProductCatalog from '../components/ProductCatalog';

const modules = import.meta.glob('../data/products/*.json', { eager: true }) as Record<string, any>;

const loadedProducts = Object.values(modules).map((mod: any) => {
  const data = mod.default ?? mod;
  return {
    ...data,
    id: data.id ?? Math.random().toString(36).slice(2),
    seller_tg: String(data.seller_tg ?? '5am_store_official'),
    imageUrl: String(data.imageUrl ?? ''),
    sizes: String(data.sizes ?? ''),
    sold: Boolean(data.sold),
  };
});

export default function CatalogPage() {
  const [products] = useState<any[]>(loadedProducts);

  return (
    <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-zinc-900 rounded-xl">
          <p className="text-zinc-600 font-mono text-xs tracking-widest uppercase">
            Каталог порожній. Додайте товари через адмін-панель.
          </p>
        </div>
      ) : (
        <ProductCatalog products={products} />
      )}
    </div>
  );
}
