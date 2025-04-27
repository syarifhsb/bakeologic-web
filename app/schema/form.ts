import { z } from "zod";

export const RequestPutCartItemsSchema = z.object({
  productId: z.string().nonempty(),
  quantity: z.number().min(1).max(99),
});
