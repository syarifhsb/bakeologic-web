import pluralize from "pluralize";
import * as React from "react";
import { data, Form, href, redirect } from "react-router";
import { InputItem } from "~/components/custom/input-item";
import { ButtonLoading } from "~/components/ui/button-loading";
import { Label } from "~/components/ui/label";
import { backendApiUrl } from "~/env";
import { formatPrice } from "~/lib/currency";
import type { AddToCartResponseFailedBody } from "~/modules/cart/type";
import type { ProductJSON } from "~/modules/product/type";
import { commitSession, getSession } from "~/sessions.server";
import type { Route } from "./+types/products-slug";

export function meta({ data }: Route.MetaArgs) {
  return [{ title: `${data.product.name} - Bakeologic` }];
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const response = await fetch(`${backendApiUrl}/products/${params.slug}`);
  const product: ProductJSON = await response.json();

  return data(
    {
      product,
      error: session.get("error"),
    },
    { headers: { "Set-Cookie": await commitSession(session) } }
  );
}

export async function action({ request, params }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  if (!token) return redirect("/login");

  const productSlugUrl = href("/products/:slug", { slug: params.slug });

  const formData = await request.formData();

  const body = {
    productId: String(formData.get("product-id")),
    quantity: Number(formData.get("quantity")),
  };

  const response = await fetch(`${backendApiUrl}/cart/items`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const addToCartResultFailed: AddToCartResponseFailedBody =
      await response.json();
    session.flash("error", addToCartResultFailed.message);
    return redirect(productSlugUrl, {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  return redirect("/cart");
}

export default function ProductsSlug({ loaderData }: Route.ComponentProps) {
  const { product, error } = loaderData;

  const productImage = product.images[0] || {
    url: "https://placehold.co/300x200",
    altText: product.name,
  };

  const [quantity, setQuantity] = React.useState(1);

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

        <section className="space-y-4 items-center">
          <Form method="post" className="flex gap-4 items-center">
            <input type="hidden" name="product-id" defaultValue={product.id} />

            <div>
              <Label className="hidden">Quantity</Label>
              <InputItem
                name="quantity"
                className="w-30"
                initialQuantity={1}
                maxQuantity={product.stockQuantity}
                onChange={setQuantity}
              />
            </div>
            <ButtonLoading textIdle="Add to cart" textSubmitting="Adding..." />
          </Form>
          {quantity > product.stockQuantity ? (
            <span className="text-red-500 text-xs">
              Only {product.stockQuantity}{" "}
              {pluralize("item", product.stockQuantity)} in stock.{" "}
            </span>
          ) : null}
          {error && <span className="text-red-500 text-xs">{error}</span>}
          <p>
            {product.stockQuantity} {pluralize("item", product.stockQuantity)}{" "}
            in stock
          </p>
        </section>
      </section>
    </div>
  );
}
