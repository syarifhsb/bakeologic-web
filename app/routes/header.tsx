import { Input } from "~/components/ui/input";
import { ShoppingCartIcon, UserRound } from "lucide-react";

import logo from "~/assets/logo.png";

export function Header() {
  return (
    <header className="flex flex-col justify-center mb-2">
      <div className="flex flex-row justify-center m-2">
        <div className="flex flex-row items-center justify-between w-6xl">
          <a href="/">
            <img src={logo} />
          </a>
          <div className="flex flex-row justify-center items-center gap-x-8">
            <div>Products</div>
            <div>About</div>
          </div>
          <div className="flex flex-row gap-x-4 items-center">
            <Input type="search" placeholder="Search" />
            <ShoppingCartIcon />
            <UserRound />
          </div>
        </div>
      </div>
      <hr className="w-screen" />
    </header>
  );
}
