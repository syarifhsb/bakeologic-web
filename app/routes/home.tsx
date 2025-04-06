import type { Route } from "./+types/home";

import MainImage from "~/assets/home.jpeg";
import { backendApiUrl } from "~/env";
import type { ProductsJSON } from "~/modules/product/type";
import { Card, CardContent } from "~/components/ui/card";
import { Link } from "react-router";

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

const featuredProducts = [
  "butter-croissant",
  "pain-au-chocolat",
  "french-baguette",
];

export default function Home({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;

  return (
    <div className="space-y-7 flex flex-col items-center justify-center">
      <img src={MainImage} height={750} width={1200} />
      <h1 className="justify-center font-semibold text-3xl">FEATURED</h1>
      <ul className="grid grid-cols-1 gap-15 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProducts.map((slug) => {
          const product = products.find((product) => product.slug === slug);
          const productImageObject = product?.images[0];
          const imageUrl =
            productImageObject?.url || "https://placehold.co/300x200";
          const altText = productImageObject?.altText || product?.name;

          return (
            <li key={slug}>
              <Link to={`/products/${slug}`}>
                <Card className="py-3 border-none bg-background shadow-none hover:shadow-accent-foreground hover:shadow-md hover:bg-card">
                  <CardContent className="px-3">
                    <div className="flex flex-col gap-1">
                      <img src={imageUrl} alt={altText} width={325} />
                      <h2 className="text-xl">{product?.name}</h2>
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
