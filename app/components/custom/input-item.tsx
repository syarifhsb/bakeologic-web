import * as React from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { PlusIcon, MinusIcon } from "lucide-react";
import { cn } from "~/lib/cn";

export function InputItem({
  name,
  value,
  handlePlus,
  handleMinus,
  setQuantity,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  name: string;
  value: number;
  setQuantity: (value: string) => void;
  handlePlus: () => void;
  handleMinus: () => void;
}) {
  return (
    <div
      className={cn(
        "flex flex-row items-center h-9 border-1 rounded-lg px-1 min-w-20",
        "shadow-xs transition-[color,box-shadow] border-input",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
        className
      )}
      {...props}
    >
      <Button
        variant="ghost"
        className="rounded-xs h-6 w-6 cursor-pointer"
        type="button"
        onClick={handleMinus}
      >
        <MinusIcon />
      </Button>
      <Input
        name={name}
        className={cn(
          "h-7 rounded-none border-none shadow-none text-center",
          "focus-visible:border-none focus-visible:ring-0"
        )}
        value={value}
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
      />
      <Button
        variant="ghost"
        className="rounded-xs h-6 w-6 cursor-pointer"
        type="button"
        onClick={handlePlus}
      >
        <PlusIcon />
      </Button>
    </div>
  );
}
