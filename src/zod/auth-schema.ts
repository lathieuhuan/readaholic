import { z } from "./config";

export const authSchema = z.object({
  username: z
    .string()
    .nonempty()
    .refine((value) => !/^\s+$/.test(value ?? ""), "INVALID_VALUE"),
  password: z.string().nonempty().min(8),
});

export type AuthSchemaType = z.infer<typeof authSchema>;
