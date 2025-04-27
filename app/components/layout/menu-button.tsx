import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { Form, Link } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import type { AuthMeResponseSuccessBody } from "~/modules/auth/type";
import type { MenuItems } from "~/modules/common/type";

export function MenuButton({
  menuItems,
  user,
}: {
  menuItems: MenuItems;
  user?: AuthMeResponseSuccessBody;
}) {
  const isAuthenticated = Boolean(user?.id);
  const [open, setOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(false);
    const searchQuery = event.currentTarget.q.value;
    if (searchQuery) {
      window.location.href = `/products?q=${searchQuery}`;
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          className="h-10 bg-background text-foreground border-none shadow-none"
          variant="ghost"
        >
          <MenuIcon />
          <span>Menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex flex-col items-center justify-center">
          <DrawerTitle>Menu</DrawerTitle>
          <DrawerDescription>Explore our products</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col items-center justify-center my-4 gap-y-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} className="cursor-pointer">
                Products
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
              <DropdownMenuLabel>Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {menuItems.map((menuItem) => (
                  <DropdownMenuItem
                    asChild
                    key={menuItem.to}
                    className="block w-full p-2 rounded-md transition-colors hover:bg-black hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none"
                  >
                    <DrawerClose asChild>
                      <Link to={menuItem.to}>{menuItem.name}</Link>
                    </DrawerClose>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DrawerClose asChild>
            <Button variant={"ghost"} asChild>
              <Link to="/about">About</Link>
            </Button>
          </DrawerClose>
          <Form action="/products" onSubmit={handleSubmit}>
            <Input name="q" type="search" placeholder="Search" />
          </Form>
          {!isAuthenticated && (
            <DrawerFooter>
              <div className="mx-auto space-x-4">
                <DrawerClose asChild>
                  <Button asChild variant={"secondary"}>
                    <Link to="/register">Register</Link>
                  </Button>
                </DrawerClose>
                <DrawerClose asChild>
                  <Button asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                </DrawerClose>
              </div>
            </DrawerFooter>
          )}

          {isAuthenticated && (
            <DrawerFooter>
              <div className="mx-auto space-x-4">
                <DrawerClose asChild>
                  <Button asChild>
                    <Link to="/logout">Logout</Link>
                  </Button>
                </DrawerClose>
              </div>
            </DrawerFooter>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
