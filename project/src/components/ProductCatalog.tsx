import ProductCard, { type Product } from './ProductCard';

interface CatalogProps {
  products: Product[];
}

export default function ProductCatalog({ products }: CatalogProps) {
  if (!products || products.length === 0) {
    return <p className="text-zinc-500 text-center py-10">Товарів поки немає.</p>;
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
