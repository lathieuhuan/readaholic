import { z } from "./config";

export const authSchema = z
  .object({
    username: z
      .string()
      .nonempty()
      .refine((value) => !/^\s+$/.test(value ?? ""), "INVALID_VALUE"),
    password: z.string().min(8),
    confirmPassword: z.string().nonempty(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "INCORRECT_PASSWORD_CONFIRM",
        path: ["confirmPassword"],
      });
    }
  });

export type AuthSchemaModel = z.infer<typeof authSchema>;
