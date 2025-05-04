import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/cn";
import { formatPrice } from "~/lib/currency";
import type { CartJSON } from "~/modules/cart/type";

export function OrderSummary({
  cart,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  cart?: CartJSON;
}) {
  return cart && cart.totalQuantity !== 0 ? (
    <Card className={cn("w-full lg:w-[300px]", className)} {...props}>
      <CardHeader>
        <CardTitle className="font-bold text-xl">Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex items-center justify-between gap-2">
            <span className="">Subtotal</span>
            <span className="font-bold">{formatPrice(cart.totalPrice)}</span>
          </li>
          <li className="flex items-center justify-between gap-2 border-b">
            <span className="">Delivery Fee</span>
            <span className="font-bold">free</span>
          </li>
          <li className="flex items-center justify-between gap-2 pt-4">
            <span className="">Total</span>
            <span className="font-bold">{formatPrice(cart.totalPrice)}</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Order</Button>
      </CardFooter>
    </Card>
  ) : null;
}
