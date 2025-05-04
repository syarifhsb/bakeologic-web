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
  console.log(formData);

  if (request.method === "PUT") {
    try {
      const putResponse = await fetch(`${backendApiUrl}/cart`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          productId: String(formData.get("product-id")),
          quantity: Number(formData.get("quantity")),
        }),
      });
    } catch (error) {
      return redirect("/cart");
    }
  } else if (request.method === "DELETE") {
    try {
      const deleteResponse = await fetch(
        `${backendApiUrl}/cart/items/${String(formData.get("product-id"))}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!deleteResponse.ok) {
        return redirect("/cart");
      }
      return redirect("/cart");
    } catch (error) {
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
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-[1200px] mx-auto gap-4 mt-6 items-start">
        <ul className="flex flex-col gap-4 w-full lg:w-[600px]">
          {cartItems.map((item) => {
            return CartItem({ item });
          })}
        </ul>
        <OrderSummary cart={cart} />
      </div>
    </div>
  );
}
