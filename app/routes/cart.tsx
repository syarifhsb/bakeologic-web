import OrderSummary from "~/components/custom/order-summary";
import type { Route } from "./+types/cart";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { CartItemJSON, CartJSON } from "~/modules/cart/type";
import { backendApiUrl } from "~/env";
import { Link, redirect } from "react-router";
import { getSession } from "~/sessions.server";
import ProductImage from "~/components/custom/product-image";
import { formatPrice } from "~/lib/currency";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Cart - Bakeologic" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  if (!token) {
    return redirect("/login");
  }

  const response = await fetch(`${backendApiUrl}/cart`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const cart: CartJSON = await response.json();
  return { cart };
}

export default function Cart({ loaderData }: Route.ComponentProps) {
  const { cart } = loaderData;
  const cartItems: CartItemJSON[] = cart.items;

  return (
    <div className="flex items-center justify-between w-full max-w-[1200px] mx-auto">
      <ul className="flex flex-col gap-4 w-[600px]">
        {cartItems.map((item) => {
          const slug = item.product.slug;

          return (
            <li key={slug}>
              <Card className="px-6">
                <div className="flex flex-row">
                  <ProductImage
                    image={item.product.images[0]}
                    height={133}
                    width={200}
                  />
                  <div className="w-full">
                    <CardHeader>
                      <CardTitle className="">{item.product.name}</CardTitle>
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
        })}
      </ul>
      <OrderSummary />
    </div>
  );
}
