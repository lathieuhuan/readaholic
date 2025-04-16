"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/form-input";

const formSchema = z.object({
  username: z
    .string()
    .nonempty()
    .refine((value) => !/^\s+$/.test(value ?? ""), "INVALID_VALUE"),
  password: z.string().nonempty().min(8),
});

type FormValues = z.infer<typeof formSchema>;

export default function RegisterForm() {
  const t = useTranslations("AuthForm");
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <FormInput
        control={form.control}
        name="username"
        label={t("username")}
        placeholder={t("username")}
      />
      <FormInput
        control={form.control}
        name="password"
        label={t("password")}
        placeholder={t("password")}
      />
    </Form>
  );
}
