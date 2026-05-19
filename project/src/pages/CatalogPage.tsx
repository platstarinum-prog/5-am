import { useState } from 'react';
import ProductCatalog from '../components/ProductCatalog';

// Путь исправлен на 'products' — именно там лежат твои файлы
const modules = import.meta.glob('../data/products/*.json', { eager: true }) as Record<string, any>;

const loadedProducts = Object.values(modules).map((mod: any) => {
  const data = mod.default ? mod.default : mod;
  
  return {
    ...data,
    id: data.id || Math.random().toString(),
    // Приводим к массиву, если в админке ввели строку
    sizes: typeof data.sizes === 'string' ? data.sizes.split(',').map((s:string) => s.trim()) : data.sizes
  };
});

export default function CatalogPage() {
  const [products] = useState<any[]>(loadedProducts);

  return (
    <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
      {products.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-zinc-900 rounded-xl text-zinc-600">
           Каталог порожній.
        </div>
      ) : (
        <ProductCatalog products={products} />
      )}
    </div>
  );
}
