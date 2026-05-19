import ProductCard from './ProductCard';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  sizes: string;
  imageUrl: string;
  seller_tg: string; // Ссылка на ТГ продавца
  condition?: string;
  sold?: boolean;
}

interface Props {
  products: Product[];
}

export default function ProductCatalog({ products }: Props) {
  // Добавим проверку, если вдруг массив пустой
  if (!products || products.length === 0) {
    return <p className="text-zinc-500 text-center py-10">Товарів поки немає.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
        />
      ))}
    </div>
  );
}
