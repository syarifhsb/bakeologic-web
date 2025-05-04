import { ShoppingCartIcon } from "lucide-react";
import { Link, Outlet, useRouteLoaderData } from "react-router";
import { Footer } from "~/components/layout/footer";
import { Header } from "~/components/layout/header";
import { MenuButton } from "~/components/layout/menu-button";
import { Button } from "~/components/ui/button";
import type { loader as rootLoader } from "~/root";
import type { Route } from "./+types/app";
import { backendApiUrl } from "~/env";
import type { CategoriesJSON } from "~/modules/category/type";

export async function loader() {
  const categoriesResponse = await fetch(`${backendApiUrl}/categories`);
  if (!categoriesResponse.ok) return { categories: [] };
  const categories: CategoriesJSON = await categoriesResponse.json();
  return { categories };
}

export default function LayoutApp({ loaderData }: Route.ComponentProps) {
  // from layouts/app loader
  const { categories } = loaderData;

  // from root loader
  const rootLoaderData = useRouteLoaderData<typeof rootLoader>("root");
  const user = rootLoaderData?.user || undefined;
  const cart = rootLoaderData?.cart || undefined;

  const menuItems = [
    {
      name: "All Products",
      to: "/products",
    },
    ...categories.map((category) => {
      return {
        name: category.name,
        to: `/products?category=${category.slug}`,
      };
    }),
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header menuItems={menuItems} user={user} cart={cart} />

      <main id="main" className="grow flex flex-col items-center">
        <Outlet />
      </main>

      <Footer />

      <div className="sticky bottom-0 left-0 z-50 flex items-center justify-between w-full bg-background p-2 md:hidden border-t">
        <Button asChild variant="ghost">
          <Link to="/cart">
            <ShoppingCartIcon />
            <span>Cart</span>
          </Link>
        </Button>

        <MenuButton menuItems={menuItems} user={user} />
      </div>
    </div>
  );
}
