import type { ProductJSON } from "~/modules/product/type";
import type { Route } from "./+types/products-slug";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { backendApiUrl } from "~/env";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { quantitySchema } from "~/schema/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const slug = url.pathname.split("/").pop();

  const response = await fetch(`${backendApiUrl}/products/${slug}`);
  const product: ProductJSON = await response.json();

  return { product };
}

export default function ProductsSlug({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData;

  const form = useForm<z.infer<typeof quantitySchema>>({
    resolver: zodResolver(quantitySchema),
    defaultValues: {
      quantity: 1,
    },
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-10 mx-5 max-w-screen-xl">
      <img src={product?.images[0]?.url} alt={product?.images[0]?.altText} />
      <div className="flex flex-col items-left gap-2">
        <h1 className="text-3xl font-semibod">{product?.name}</h1>
        <hr />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h2 className="text-xl font-medium text-accent-foreground">
          {Number(product.price).toLocaleString("fr-FR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) + " €"}
        </h2>

        <Form {...form}>
          <div className="flex flex-row gap-4">
            <FormField
              control={form.control}
              name="quantity"
              render={(field) => (
                <FormItem className="w-18">
                  <FormLabel className="hidden">Quantity</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="1" max="99" />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Add to cart</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
