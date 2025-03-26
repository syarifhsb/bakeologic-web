import React from "react";
import { Link, Form } from "react-router";
import type { Route } from "./+types/categories";
import { ShoppingCartIcon, UserRound } from "lucide-react";

import { Input } from "~/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import logo from "~/assets/logo.png";
import type { CategoriesJSON } from "~/modules/product/type";
import { backendApiUrl } from "~/env";

export async function loader() {
  const response = await fetch(`${backendApiUrl}/categories`);
  const categories: CategoriesJSON = await response.json();
  return { categories };
}

export function Header({ loaderData }: { loaderData: Route.ComponentProps }) {
  const [open, setOpen] = React.useState(false);
  const { categories } = loaderData;

  return (
    <header className="mb-2">
      <div className="flex flex-row justify-center m-2">
        <div className="flex flex-row items-center justify-between w-6xl">
          <Link to="/">
            <img src={logo} />
          </Link>
          <div className="flex flex-row justify-center items-center gap-x-8">
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger>
                <Link to="/products">Products</Link>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to="/products" onClick={() => setOpen(false)}>
                    All
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/about">About</Link>
          </div>
          <div className="flex flex-row gap-x-4 items-center">
            <Form method="GET">
              <Input name="q" type="search" placeholder="Search" />
            </Form>
            <Link to="/cart">
              <ShoppingCartIcon />
            </Link>
            <Link to="/dashboard">
              <UserRound />
            </Link>
          </div>
        </div>
      </div>
      <hr className="w-screen" />
    </header>
  );
}
