import { useState } from "react";
import { Form, Link } from "react-router";

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

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import { MenuIcon } from "lucide-react";

import type { CategoriesJSON } from "~/modules/category/type";

export function MenuButton({ categories }: { categories: CategoriesJSON }) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(false);
    const searchQuery = event.currentTarget.q.value;
    if (searchQuery) {
      window.location.href = `/products?q=${searchQuery}`;
    }

    // TODO: Keyboard not closed on mobile
  };

  return (
    <div className="sticky bottom-0 left-0 z-50 flex items-center justify-center w-full bg-background p-4 md:hidden border-t">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            asChild
            className="h-10 w-full bg-background text-foreground border-none shadow-none"
            variant={"ghost"}
          >
            <MenuIcon />
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
                  <DropdownMenuItem key={"all"}>
                    <Link
                      to="/products"
                      className="block w-full p-2 rounded-md transition-colors hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none"
                    >
                      All Products
                    </Link>
                  </DropdownMenuItem>
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.slug}>
                      <DrawerClose asChild>
                        <Link
                          to={`/products?category=${category.slug}`}
                          className="block w-full p-2 rounded-md transition-colors hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground focus:outline-none"
                        >
                          {category.name}
                        </Link>
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
            <DrawerFooter>
              <div className="mx-auto space-x-4">
                <DrawerClose asChild>
                  <Button asChild>
                    <Link to={"/cart"}>Cart</Link>
                  </Button>
                </DrawerClose>
                <DrawerClose asChild>
                  <Button asChild>
                    <Link to={"/dashboard"}>Login</Link>
                  </Button>
                </DrawerClose>
              </div>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
