import { href, Link } from "react-router";
import { ProductImage } from "~/components/custom/product-image";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/cn";
import { formatPrice } from "~/lib/currency";
import type { CartItemJSON } from "~/modules/cart/type";

export function CartItem({
  item,
  className,
  ...props
}: React.ComponentProps<"li"> & { item: CartItemJSON }) {
  const slug = item.product.slug;
  const to = href("/products/:slug", { slug });

  return (
    <li key={slug} className={cn("", className)} {...props}>
      <Card className="px-6">
        <div className="flex flex-row">
          <Link to={to}>
            <ProductImage
              image={item.product.images[0]}
              height={133}
              width={200}
              className="rounded-sm"
            />
          </Link>
          <div className="w-full">
            <CardHeader>
              <Link to={to}>
                <CardTitle className="">{item.product.name}</CardTitle>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm">Quantity</span>
                <span className="text-sm">{item.quantity}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Price</span>
                <span className="text-sm">
                  {formatPrice(item.product.price)}
                </span>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </li>
  );
}
