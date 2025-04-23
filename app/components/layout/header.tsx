import { ShoppingCartIcon, UserRound } from "lucide-react";
import { Form, Link } from "react-router";
import { Logo } from "~/components/custom/logo";
import { Input } from "~/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import type { MenuItems } from "~/modules/common/type";
import { Button } from "../ui/button";
import type { AuthMeResponseBody } from "~/modules/auth/type";

export function Header({
  menuItems,
  user,
}: {
  menuItems: MenuItems;
  user?: AuthMeResponseBody;
}) {
  const isAuthenticated = Boolean(user?.id);

  return (
    <header className="mb-0 md:mb-7 border-b">
      <div className="flex flex-row mx-7 my-5">
        <div className="flex flex-row items-center justify-center md:justify-between w-full">
          <Link to="/">
            <Logo />
          </Link>

          <div className="hidden md:flex flex-row justify-center items-center gap-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-medium text-md">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="p-2 w-[200px]">
                      {menuItems.map((menuItem) => (
                        <li key={menuItem.to}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={`/products?category=${menuItem.to}`}
                              className="block w-full p-2 rounded-md transition-colors hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none"
                            >
                              {menuItem.name}
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
                    className="font-medium text-md rounded-md h-9 px-4 py-2 has-[>svg]:px-3 inline-flex items-center justify-center gap-2"
                  >
                    <Link to="/about">About</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden md:flex flex-row gap-x-4 items-center">
            <Form action="/products">
              <Input
                name="q"
                type="search"
                placeholder="Search"
                className="w-52"
              />
            </Form>

            {isAuthenticated && (
              <>
                <Link to="/cart">
                  <ShoppingCartIcon />
                </Link>
                <Link to="/dashboard">
                  <UserRound />
                </Link>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Button asChild size="sm" variant="secondary">
                  <Link to="/register">Register</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/login">Login</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
