import { MinusIcon, PlusIcon } from "lucide-react";
import * as React from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/cn";

export function InputItem({
  name,
  initialQuantity = 1,
  maxQuantity,
  onChange,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "onChange"> & {
  name: string;
  initialQuantity?: number;
  maxQuantity?: number;
  onChange?: (quantity: number) => void;
}) {
  const [quantity, setQuantity] = React.useState(initialQuantity);

  const increaseItem = () => {
    if (maxQuantity && quantity >= maxQuantity) return;
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onChange?.(newQuantity);
  };

  const decreaseItem = () => {
    if (quantity <= 1) return;
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    onChange?.(newQuantity);
  };

  const updateValue = (value: string) => {
    if (isNaN(Number(value))) {
      const newQuantity = 1;
      setQuantity(newQuantity);
      onChange?.(newQuantity);
      return;
    }

    const newQuantity = Number(value);
    if (maxQuantity && newQuantity > maxQuantity) {
      setQuantity(maxQuantity);
      onChange?.(maxQuantity);
      return;
    }
    setQuantity(newQuantity);
    onChange?.(newQuantity);
  };

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
        onClick={decreaseItem}
      >
        <MinusIcon />
      </Button>
      <Input
        name={name}
        className={cn(
          "h-7 rounded-none border-none shadow-none text-center",
          "focus-visible:border-none focus-visible:ring-0"
        )}
        value={quantity}
        onChange={(e) => updateValue(e.target.value)}
        onBlur={(e) => {
          const value = e.target.value;
          if (!value || value === "" || value === "0") {
            setQuantity(1);
            onChange?.(1);
            return;
          }
          updateValue(value);
        }}
      />
      <Button
        variant="ghost"
        className="rounded-xs h-6 w-6 cursor-pointer"
        type="button"
        onClick={increaseItem}
      >
        <PlusIcon />
      </Button>
    </div>
  );
}
