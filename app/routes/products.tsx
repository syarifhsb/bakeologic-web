import type { Route } from "./+types/home";

import { Header } from "~/components/layout/header";
import { Footer } from "~/components/layout/footer";

import MainImage from "~/assets/home.jpeg";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Products from Bakeologic" },
    { name: "description", content: "See all products." },
  ];
}

export default function Products() {
  return (
    <div>
      <h1>Products</h1>
    </div>
  );
}
