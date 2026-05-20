import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { type Product } from '../components/ProductCard';

const modules = import.meta.glob('../data/products/*.json', { eager: true }) as Record<string, any>;
const allProducts: Product[] = Object.values(modules).map((mod: any) => {
  const data = mod.default ?? mod;
  return { ...data, id: data.id ?? Math.random().toString(36).slice(2) };
});

const conditionLabel: Record<string, string> = {
  'Новий': 'Новий',
  'Відмінний': 'Відмінний',
  'Хороший': 'Хороший',
  'Б/У': 'Б/У',
};

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = allProducts.find(p => p.id === id);
  const [activeImg, setActiveImg] = useState(0);

  if (!product) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 pt-32 pb-16 text-center">
        <p className="text-zinc-500 font-mono text-sm uppercase">Товар не знайдено</p>
        <button onClick={() => navigate('/catalog')} className="mt-6 border border-zinc-700 text-white text-xs font-mono uppercase px-6 py-3 hover:border-white transition-all">
          ← Повернутись
        </button>
      </div>
    );
  }

  const { name, brand, price, sizes, images, seller_tg, condition, sold, description, category } = product;
  const rawUsername = (seller_tg ?? '').toString().trim().replace(/^@/, '');
  const username = rawUsername || '5am_store_official';
  const telegramUrl = 'https://t.me/' + username;

  return (
    <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-16">

      <button onClick={() => navigate('/catalog')} className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest hover:text-white transition-colors mb-10 flex items-center gap-2">
        ← Каталог
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

        {/* Галерея */}
        <div className="flex flex-col gap-3">
          <div className="aspect-[4/5] bg-zinc-900 rounded-xl overflow-hidden">
            <img
              src={images?.[activeImg] ?? ''}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          {images && images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={'flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ' + (activeImg === i ? 'border-white' : 'border-transparent opacity-50 hover:opacity-80')}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Інфо */}
        <div className="flex flex-col">
          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-2">{brand || '5AM'}</p>
          <h1 className="text-white font-black text-3xl uppercase leading-tight mb-2">{name}</h1>
          <p className="text-white font-bold text-2xl mb-8">{Number(price).toLocaleString('uk-UA')} <span className="text-zinc-500 text-sm font-normal">грн</span></p>

          {/* Віджети */}
          <div className="flex flex-col gap-4 mb-8">

            {condition && (
              <div className="flex items-center justify-between border border-zinc-800 px-4 py-3 rounded-lg">
                <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Стан</span>
                <span className="text-white text-xs font-medium">{conditionLabel[condition] ?? condition}</span>
              </div>
            )}

            {sizes && (
              <div className="flex items-center justify-between border border-zinc-800 px-4 py-3 rounded-lg">
                <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Розмір</span>
                <span className="text-white text-xs font-medium">{sizes}</span>
              </div>
            )}

            {category && (
              <div className="flex items-center justify-between border border-zinc-800 px-4 py-3 rounded-lg">
                <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Категорія</span>
                <span className="text-white text-xs font-medium">{category}</span>
              </div>
            )}

          </div>

          {/* Опис */}
          {description && (
            <p className="text-zinc-400 text-sm leading-relaxed mb-8 border-t border-zinc-800 pt-6">{description}</p>
          )}

          {/* Кнопка */}
          {sold ? (
            <div className="border border-zinc-800 text-zinc-600 text-xs font-mono uppercase px-6 py-4 text-center rounded-lg">
              Продано
            </div>
          ) : (
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black text-xs font-bold uppercase px-6 py-4 text-center rounded-lg hover:bg-zinc-200 transition-all tracking-widest"
            >
              Написати в Telegram
            </a>
          )}

        </div>
      </div>
    </div>
  );
}
