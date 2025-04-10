import { Card, CardContent } from "~/components/ui/card";
import type { ProductJSON } from "~/modules/product/type";
import ProductImage from "./product-image";

export default function ProductCard({ product }: { product: ProductJSON }) {
  const productImage = product.images[0] ? product.images[0] : undefined;

  return (
    <Card
      className="py-3 border-none bg-background shadow-none hover:shadow-accent-foreground hover:shadow-md hover:bg-card"
      key={product.slug}
    >
      <CardContent className="px-3">
        <div className="flex flex-col gap-1">
          <ProductImage image={productImage} />
          <h2 className="text-xl border-b">{product.name}</h2>
          <div className="flex flex-row justify-between items-center">
            <span className="text-xl">
              {Number(product.price).toLocaleString("fr-FR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) + " €"}
            </span>
            <span className="text-sm">{product.stockQuantity} left</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
