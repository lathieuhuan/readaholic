import { z } from "zod";
import { StringUtils } from "@lib/utils/string-utils";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty()
    .refine((value) => !StringUtils.isEmpty(value), "INVALID_VALUE"),
  password: z
    .string()
    .nonempty()
    .refine((value) => !StringUtils.isEmpty(value), "INVALID_VALUE"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
