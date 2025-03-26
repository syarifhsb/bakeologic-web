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
    <header className="mb-2">
      <div className="flex flex-row justify-center m-2">
        <div className="flex flex-row items-center justify-between w-6xl">
          <Link to="/">
            <img src={logo} />
          </Link>

          <div className="flex flex-row justify-center items-center gap-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Products</NavigationMenuTrigger>
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
                  <NavigationMenuLink asChild>
                    <Link to="/about" className="p-2">
                      About
                    </Link>
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
