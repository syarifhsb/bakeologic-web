import { ShoppingCartIcon } from "lucide-react";
import { Link, Outlet } from "react-router";
import { Footer } from "~/components/layout/footer";
import { Header } from "~/components/layout/header";
import { MenuButton } from "~/components/layout/menu-button";
import { Button } from "~/components/ui/button";
import { backendApiUrl } from "~/env";
import type { AuthMeResponseBody } from "~/modules/auth/type";
import type { CategoriesJSON } from "~/modules/category/type";
import { getSession } from "~/sessions.server";
import type { Route } from "./+types/app";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");

  const [categoriesResponse, authMeResponse] = await Promise.all([
    fetch(`${backendApiUrl}/categories`),
    fetch(`${backendApiUrl}/auth/me`, {
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    }),
  ]);

  const categories: CategoriesJSON = await categoriesResponse.json();
  if (!authMeResponse.ok) {
    return { categories };
  }

  const user: AuthMeResponseBody = await authMeResponse.json();
  return { categories, user };
}

export default function Layout({ loaderData }: Route.ComponentProps) {
  const { categories, user } = loaderData;

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
      <Header menuItems={menuItems} user={user} />

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
