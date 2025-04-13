import { Link, Outlet } from "react-router";

import { Footer } from "~/components/layout/footer";
import { Header } from "~/components/layout/header";

import type { Route } from "./+types/layout";
import { backendApiUrl } from "~/env";
import type { CategoriesJSON } from "~/modules/category/type";
import { MenuButton } from "~/components/layout/menu-button";
import { ShoppingCartIcon } from "lucide-react";
import { Button } from "~/components/ui/button";

export async function loader() {
  const response = await fetch(`${backendApiUrl}/categories`);
  const categories: CategoriesJSON = await response.json();
  return { categories };
}

export default function Layout({ loaderData }: Route.ComponentProps) {
  const { categories } = loaderData;

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
      <Header menuItems={menuItems} />

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

        <MenuButton menuItems={menuItems} />
      </div>
    </div>
  );
}
