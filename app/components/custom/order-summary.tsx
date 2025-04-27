import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/cn";

export default function OrderSummary({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <Card className={cn("min-w-[300px]", className)} {...props}>
      <CardHeader>
        <CardTitle className="font-bold text-xl">Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex items-center justify-between gap-2">
            <span className="">Subtotal</span>
            <span className="font-bold">$100.00</span>
          </li>
          <li className="flex items-center justify-between gap-2 border-b">
            <span className="">Delivery Fee</span>
            <span className="font-bold">free</span>
          </li>
          <li className="flex items-center justify-between gap-2 pt-4">
            <span className="">Total</span>
            <span className="font-bold">$100.00</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Order</Button>
      </CardFooter>
    </Card>
  );
}
