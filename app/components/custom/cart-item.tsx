import { useEffect, useState } from "react";
import { Trash2Icon } from "lucide-react";
import { Form, href, Link, useSubmit } from "react-router";
import { ProductImage } from "~/components/custom/product-image";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/cn";
import { formatPrice } from "~/lib/currency";
import type { CartItemJSON } from "~/modules/cart/type";
import { useDebounce } from "use-debounce";

export function CartItem({
  item,
  className,
  ...props
}: React.ComponentProps<"li"> & { item: CartItemJSON }) {
  const slug = item.product.slug;
  const to = href("/products/:slug", { slug });
  const submit = useSubmit();

  const [quantity, setQuantity] = useState(item.quantity);
  const [debouncedQuantity] = useDebounce(quantity, 500);

  function handleQuantityChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuantity(Number(event.target.value));
  }

  useEffect(() => {
    if (debouncedQuantity !== item.quantity) {
      const formData = new FormData();
      formData.append("quantity", String(debouncedQuantity));
      formData.append("item-id", item.id);

      submit(formData, { method: "patch", action: "/cart" });
    }
  }, [debouncedQuantity, item.quantity, submit]);

  return (
    <li key={slug} className={cn("", className)} {...props}>
      <Card className="px-6">
        <div className="flex flex-row">
          <div>
            <Link to={to}>
              <ProductImage
                image={item.product.images[0]}
                height={100}
                width={150}
                className="rounded-sm"
              />
            </Link>
          </div>
          <div className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <Link to={to}>
                <CardTitle className="font-bold">{item.product.name}</CardTitle>
              </Link>

              <Form method="delete" action="/cart">
                <input type="hidden" name="item-id" defaultValue={item.id} />
                <Button
                  variant="ghost"
                  className="hover:cursor-pointer"
                  size="sm"
                >
                  <Trash2Icon />
                </Button>
              </Form>
            </CardHeader>

            <CardContent className="mt-2">
              <div className="flex flex-col items-start justify-between space-y-2">
                <span className="text-sm">
                  {formatPrice(item.product.price)}
                </span>
                <div className="flex justify-between w-full">
                  <div className="flex flex-col">
                    <span>Quantity</span>

                    <Form method="put" action="/cart">
                      <input
                        type="hidden"
                        name="item-id"
                        defaultValue={item.id}
                      />
                      <Input
                        name="quantity"
                        type="number"
                        min={1}
                        max={item.product.stockQuantity}
                        defaultValue={item.quantity}
                        onChange={handleQuantityChange}
                      />
                    </Form>
                  </div>
                  <span>Subtotal: {formatPrice(item.totalPrice)}</span>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </li>
  );
}
