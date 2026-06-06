import { useNavigate } from 'react-router-dom';
import { useLang } from '../i18n/LanguageContext';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  sizes: string;
  images: string[];
  seller_tg?: string;
  condition?: string;
  sold?: boolean;
  description?: string;
}

export default function ProductCard(product: Product) {
  const navigate = useNavigate();
  const { t, loc } = useLang();
  const cover = Array.isArray(product.images) ? product.images[0] : '';

  return (
    <article
      onClick={() => !product.sold && navigate(`/catalog/${product.id}`)}
      className={'group relative flex flex-col bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden transition-all cursor-pointer ' + (product.sold ? 'opacity-60 cursor-default' : 'hover:border-zinc-700')}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
        <img src={cover} alt={loc(product, 'name')} width="400" height="500" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        {product.sold && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="text-white font-mono text-[10px] uppercase border border-white/30 px-3 py-1 rounded-full">{t('product.sold')}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-zinc-500 font-mono text-[10px] uppercase mb-1">{loc(product, 'brand') || '5AM'}</p>
        <h3 className="text-white font-medium text-sm truncate mb-3">{loc(product, 'name')}</h3>
        <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
          <span className="text-white font-bold text-sm">{Number(product.price).toLocaleString('uk-UA')} <span className="text-zinc-500 text-[10px]">{t('product.uah')}</span></span>
          <span className="text-zinc-500 font-mono text-[10px]">{loc(product, 'sizes')}</span>
        </div>
      </div>
    </article>
  );
}
