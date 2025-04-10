import { cn } from "~/lib/cn";

import { Card, CardContent } from "~/components/ui/card";
import type { ProductJSON } from "~/modules/product/type";

import ProductImage from "./product-image";

type productCardVariant = "default" | "featured";

export default function ProductCard({
  product,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & {
  product: ProductJSON;
  variant?: productCardVariant;
}) {
  const productImage = product.images[0] ? product.images[0] : undefined;
  const borderClass = variant === "featured" ? "border-none" : "border-b";

  return (
    <Card
      className="py-3 border-none bg-background shadow-none hover:shadow-accent-foreground hover:shadow-md hover:bg-card"
      key={product.slug}
      {...props}
    >
      <CardContent className="px-3">
        <div className="flex flex-col gap-1">
          <ProductImage image={productImage} />
          <h2 className={cn("text-xl", borderClass)}>{product.name}</h2>
          {variant !== "featured" && (
            <div className="flex flex-row justify-between items-center">
              <span className="text-xl">
                {Number(product.price).toLocaleString("fr-FR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + " €"}
              </span>
              <span className="text-sm">{product.stockQuantity} left</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
