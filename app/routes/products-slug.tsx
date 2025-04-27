import { zodResolver } from "@hookform/resolvers/zod";
import pluralize from "pluralize";
import { useForm } from "react-hook-form";
import { Form } from "react-router";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { backendApiUrl } from "~/env";
import { formatPrice } from "~/lib/currency";
import type { ProductJSON } from "~/modules/product/type";
import { quantitySchema } from "~/schema/form";
import type { Route } from "./+types/products-slug";

export function meta({ data }: Route.MetaArgs) {
  return [{ title: `${data.name} - Bakeologic` }];
}

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
    <div className="flex justify-center items-start flex-wrap gap-10 my-10 mx-5 max-w-screen-xl">
      <img
        className="object-cover rounded-lg w-full max-w-md"
        width={400}
        height={300}
        src={productImage.url}
        alt={productImage.altText}
      />

      <section className="flex flex-col items-left gap-6 max-w-md">
        <h1 className="text-3xl font-semibold border-b">{product.name}</h1>

        <p>{product.description}</p>

        <h2 className="text-xl font-medium text-accent-foreground">
          {formatPrice(product.price)}
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
      </section>
    </div>
  );
}
