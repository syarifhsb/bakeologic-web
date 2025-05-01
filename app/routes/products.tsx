import { Link } from "react-router";
import { ProductCard } from "~/components/custom/product-card";
import { backendApiUrl } from "~/env";
import type { ProductJSON, ProductsJSON } from "~/modules/product/type";
import type { Route } from "./+types/products";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Products from Bakeologic" },
    { name: "description", content: "See all products." },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const apiUrl = new URL(`${backendApiUrl}/products`);

  const q = url.searchParams.get("q");
  const category = url.searchParams.get("category");
  if (q) apiUrl.searchParams.set("q", q);
  if (category) apiUrl.searchParams.set("category", category);

  const response = await fetch(apiUrl.toString());
  const products: ProductsJSON = await response.json();
  return { products, category };
}

export default function Products({ loaderData }: Route.ComponentProps) {
  const { products, category } = loaderData;

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mt-5">
        {category
          ? `${category.charAt(0).toUpperCase() + category.slice(1)}`
          : "All Products"}
      </h1>
      <ul className="grid grid-cols-1 gap-15 sm:grid-cols-2 lg:grid-cols-3 my-5">
        {products.map((product: ProductJSON) => {
          return (
            <li key={product.id}>
              <Link to={`/products/${product.slug}`}>
                <ProductCard product={product} variant={"default"} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
