import { ShoppingCartIcon } from "lucide-react";
import React from "react";
import { Form, Link } from "react-router";
import { Logo } from "~/components/custom/logo";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import type { AuthMeResponseSuccessBody } from "~/modules/auth/type";
import type { CartJSON } from "~/modules/cart/type";
import type { MenuItems } from "~/modules/common/type";

export function Header({
  menuItems,
  user,
  cart,
}: {
  menuItems: MenuItems;
  user?: AuthMeResponseSuccessBody;
  cart?: CartJSON;
}) {
  const isAuthenticated = Boolean(user?.id);
  const avatarUrl = user?.avatarUrl
    ? user.avatarUrl
    : "https://github.com/shadcn.png";

  const [showLogoutDialog, setShowLogoutDialog] = React.useState(false);

  return (
    <header className="border-b">
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
                              to={menuItem.to}
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
                <Link
                  to="/cart"
                  className="flex flex-row items-center gap-x-1 relative"
                >
                  <ShoppingCartIcon />
                  {cart && cart.totalQuantity > 0 && (
                    <span className="absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {cart?.totalQuantity > 99 ? "99+" : cart?.totalQuantity}
                    </span>
                  )}
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger className="cursor-pointer">
                    <Avatar className="border">
                      <AvatarImage src={avatarUrl} alt="avatar" />
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setShowLogoutDialog(true)}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Dialog
                  open={showLogoutDialog}
                  onOpenChange={setShowLogoutDialog}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Logout</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to logout?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Form method="post" action="/logout">
                          <Button type="submit">Logout</Button>
                        </Form>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
