import { Link } from "react-router";
import { ProductCard } from "~/components/custom/product-card";
import { backendApiUrl } from "~/env";
import type { ProductsJSON } from "~/modules/product/type";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bakeologic" },
    { name: "description", content: "Baking with logic, love and magic." },
  ];
}

export async function loader() {
  const response = await fetch(`${backendApiUrl}/products`);
  const products: ProductsJSON = await response.json();
  return { products };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;

  const featuredProducts = products.filter((product) => {
    return product.featured;
  });

  return (
    <div className="space-y-7 flex flex-col items-center justify-center mt-7 md:mt-0">
      <section className="relative md:my-20 my-14">
        <img
          className="block object-cover w-full h-auto"
          alt="Promotional Banner"
          src="/images/home.jpeg"
          height={750}
          width={1200}
        />
        <div className="absolute top-5 left-5 lg:top-10 lg:left-10 text-white sm:p-4 p-3 bg-amber-950 bg-opacity-50">
          <h1 className="md:text-2xl sm:text-xl text-lg font-bold">
            Bakeologic
          </h1>
          <h3 className="md:text-xl sm:text-lg text-xs font-medium">
            Baking with logic, love and magic.
          </h3>
        </div>
      </section>

      <h1 className="justify-center font-semibold text-3xl">FEATURED</h1>

      <ul className="grid grid-cols-1 gap-15 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProducts.map((product) => {
          const slug = product.slug;

          return (
            <li key={slug}>
              <Link to={`/products/${slug}`}>
                <ProductCard product={product} variant={"featured"} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
