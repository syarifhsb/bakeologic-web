import { Outlet } from "react-router";

import { Footer } from "~/components/layout/footer";
import { Header } from "~/components/layout/header";

import type { Route } from "./+types/layout";
import { backendApiUrl } from "~/env";
import type { CategoriesJSON } from "~/modules/product/type";

export async function loader() {
  const response = await fetch(`${backendApiUrl}/categories`);
  const categories: CategoriesJSON = await response.json();
  return { categories };
}

export default function Layout(loaderData: Route.ComponentProps) {
  const { categories } = loaderData;

  return (
    <div className="flex flex-col min-h-screen">
      <Header categories={categories} />

      <main id="main" className="grow flex flex-col items-center">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
