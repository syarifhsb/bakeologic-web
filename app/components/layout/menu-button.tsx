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

import { MenuIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export function MenuButton() {
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
