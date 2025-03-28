import type { ProductJSON } from "~/modules/product/type";
import type { Route } from "./+types/products-slug";

import { backendApiUrl } from "~/env";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const slug = url.pathname.split("/").pop();

  const response = await fetch(`${backendApiUrl}/products/${slug}`);
  const product: ProductJSON = await response.json();

  return { product };
}

export default function ProductsSlug({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData;
  console.log(product);

  return (
    <div className="flex flex-row gap-10 m-10">
      <img src={product?.images[0]?.url} alt={product?.images[0]?.altText} />
      <div className="flex flex-col items-left">
        <h1 className="text-3xl font-semibold mt-5">{product?.name}</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h2>{product?.price}</h2>
      </div>
    </div>
  );
}
