import { redirect } from "react-router";
import { CartItem } from "~/components/custom/cart-item";
import { OrderSummary } from "~/components/custom/order-summary";
import { backendApiUrl } from "~/env";
import type { CartItemJSON, CartJSON } from "~/modules/cart/type";
import { getSession } from "~/sessions.server";
import type { Route } from "./+types/cart";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Cart - Bakeologic" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  if (!token) return redirect("/login");

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
          return CartItem({ item });
        })}
      </ul>
      <OrderSummary />
    </div>
  );
}
