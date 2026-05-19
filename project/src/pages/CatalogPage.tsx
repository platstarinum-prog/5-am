import { useState, useMemo } from 'react';
import ProductCatalog from '../components/ProductCatalog';

// Путь к файлам товаров
const modules = import.meta.glob('../data/products/*.json', { eager: true }) as Record<string, any>;

const loadedProducts = Object.values(modules).map((mod: any) => {
  const data = mod.default ?? mod;
  return {
    ...data,
    id: data.id ?? Math.random().toString(36).slice(2),
    category: data.category ?? 'Інше', 
  };
});

export default function CatalogPage() {
  const [products] = useState<any[]>(loadedProducts);
  const [activeCat, setActiveCat] = useState('Всі');

  // Динамически собираем список категорий из товаров
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category)));
    return ['Всі', ...cats];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return activeCat === 'Всі' ? products : products.filter(p => p.category === activeCat);
  }, [activeCat, products]);

  return (
    <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">
      <h1 className="text-white font-black text-5xl uppercase mb-10">Колекція</h1>
      
      {/* Кнопки фильтрации */}
      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-4 py-2 border text-xs uppercase transition ${
              activeCat === cat ? 'bg-white text-black border-white' : 'border-zinc-900 text-zinc-500 hover:border-zinc-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <ProductCatalog products={filteredProducts} />
    </div>
  );
}
