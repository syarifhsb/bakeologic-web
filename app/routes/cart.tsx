import type { Route } from "./+types/cart";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Cart - Bakeologic" }];
}

export default function Cart() {
  return <div>Cart</div>;
}
