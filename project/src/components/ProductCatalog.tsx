import { useLang } from '../i18n/LanguageContext';
import ProductCard, { type Product } from './ProductCard';

interface CatalogProps {
  products: Product[];
}

export default function ProductCatalog({ products }: CatalogProps) {
  const { t } = useLang();
  if (!products || products.length === 0) {
    return <p className="text-zinc-500 text-center py-10">{t('catalog.empty')}</p>;
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
