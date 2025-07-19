import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório." }),
  price: z.string().min(1, { message: "O preço é obrigatório." }),
  sku: z.string().min(1, { message: "O SKU é obrigatório." }),
});

export type ProductFormValues = z.infer<typeof productSchema>;
