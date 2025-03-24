import { Link } from "react-router";
import type { Route } from "./+types/products";
import { backendApiUrl } from "~/env";
import type { ProductsJSON } from "~/modules/product/type";
import { Card, CardContent } from "~/components/ui/card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Products from Bakeologic" },
    { name: "description", content: "See all products." },
  ];
}

export async function loader() {
  const response = await fetch(`${backendApiUrl}/products`);
  const products: ProductsJSON = await response.json();
  return { products };
}

export default function Products({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mt-5">Products</h1>
      <ul className="grid grid-cols-1 gap-15 sm:grid-cols-2 lg:grid-cols-3 my-5">
        {products.map((product) => {
          // TODO: Refactor to separate function
          const productImageObject = product.images[0];

          const imageUrl = productImageObject?.url
            ? productImageObject.url
            : "https://placehold.co/300x200";

          const altText = productImageObject?.altText
            ? productImageObject.altText
            : product.name;

          return (
            <li key={product.id}>
              <Link to={`/products/${product.slug}`}>
                <Card className="py-3 border-none bg-background shadow-none hover:shadow-foreground hover:shadow-md">
                  <CardContent className="px-3">
                    <div className="flex flex-col gap-1">
                      {/* TODO: <ProductImage product={product} /> */}
                      <img src={imageUrl} alt={altText} width={325} />
                      <h2 className="text-xl">{product.name}</h2>
                      <hr />
                      <p className="text-xl">{product.price}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
