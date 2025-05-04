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

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  if (!token) return redirect("/login");

  const formData = await request.formData();

  if (request.method === "DELETE") {
    const itemId = String(formData.get("item-id"));

    try {
      await fetch(`${backendApiUrl}/cart/items/${itemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      return redirect("/cart");
    } catch (error: unknown) {
      console.error(error);
      return redirect("/cart");
    }
  }

  if (request.method === "PUT") {
    const body = {
      itemId: String(formData.get("item-id")),
      quantity: Number(formData.get("quantity")),
    };

    try {
      await fetch(`${backendApiUrl}/cart`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
    } catch (error: unknown) {
      console.error(error);
      return redirect("/cart");
    }
  }
}

export default function Cart({ loaderData }: Route.ComponentProps) {
  const { cart } = loaderData;
  const cartItems: CartItemJSON[] = cart.items;

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mt-5">
        {cart.totalQuantity === 0 ? "You have no items in your cart." : "Cart"}
      </h1>
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-[1200px] mx-auto gap-4 mt-6">
        <ul className="flex flex-col gap-4 w-full lg:w-[600px]">
          {cartItems.map((item) => {
            return <CartItem key={item.id} item={item} />;
          })}
        </ul>
        <OrderSummary cart={cart} />
      </div>
    </div>
  );
}
