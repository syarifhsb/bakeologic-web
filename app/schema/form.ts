import { z } from "zod";

export const quantitySchema = z.object({
  quantity: z.number().min(1).max(99),
});
