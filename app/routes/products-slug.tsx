import type { ProductJSON } from "~/modules/product/type";
import type { Route } from "./+types/products-slug";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { backendApiUrl } from "~/env";
import { quantitySchema } from "~/schema/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Form } from "react-router";
import { Label } from "~/components/ui/label";
import { pluralize } from "~/modules/common/utils";

export async function loader({ params }: Route.LoaderArgs) {
  const response = await fetch(`${backendApiUrl}/products/${params.slug}`);
  return (await response.json()) as ProductJSON;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const quantity = Number(formData.get("quantity"));

  console.info({ quantity });

  // const response = await fetch(`${backendApiUrl}/cart`, {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${""}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     productId: 1,
  //     quantity: 1,
  //   }),
  // });

  return null;
}

export default function ProductsSlug({ loaderData }: Route.ComponentProps) {
  const product = loaderData;

  const form = useForm<z.infer<typeof quantitySchema>>({
    resolver: zodResolver(quantitySchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const productImage = product.images[0] || {
    url: "https://placehold.co/300x200",
    altText: product.name,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-10 mx-5 max-w-screen-xl">
      <img src={productImage.url} alt={productImage.altText} />
      <div className="flex flex-col items-left gap-6">
        <h1 className="text-3xl font-semibold border-b">{product.name}</h1>

        <p>{product.description}</p>

        <h2 className="text-xl font-medium text-accent-foreground">
          {Number(product.price).toLocaleString("fr-FR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) + " €"}
        </h2>

        <section className="flex gap-4 items-center">
          <Form method="post" className="flex gap-4 items-center">
            <Label className="hidden">Quantity</Label>
            <Input
              name="quantity"
              className="w-18"
              type="number"
              min={1}
              max={product.stockQuantity}
              defaultValue={1}
            />
            <Button type="submit">Add to cart</Button>
          </Form>
          <p>
            {product.stockQuantity} {pluralize("item", product.stockQuantity)}{" "}
            in stock
          </p>
        </section>
      </div>
    </div>
  );
}
