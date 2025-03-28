import React from "react";
import { Link, Form } from "react-router";
import { ShoppingCartIcon, UserRound } from "lucide-react";

import { Input } from "~/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import logo from "~/assets/logo.png";
import type { CategoriesJSON } from "~/modules/product/type";

export function Header({ categories }: { categories: CategoriesJSON }) {
  return (
    <header className="mb-7">
      <div className="flex flex-row mx-7 my-5">
        <div className="flex flex-row items-center justify-between w-full">
          <Link to="/">
            <img src={logo} />
          </Link>

          <div className="flex flex-row justify-center items-center gap-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-medium text-xl">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[200px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/products"
                            className="block w-full p-2 rounded-md transition-colors hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none"
                          >
                            All Products
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {categories.map((category) => (
                        <li key={category.id}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={`/products?category=${category.slug}`}
                              className="block w-full p-2 rounded-md transition-colors hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none"
                            >
                              {category.name}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className="font-medium text-xl rounded-md h-9 px-4 py-2 has-[>svg]:px-3 inline-flex items-center justify-center gap-2"
                  >
                    <Link to="/about">About</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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
