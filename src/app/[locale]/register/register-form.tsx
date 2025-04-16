"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/lib/components/form";
import { FormInput } from "@/lib/form/form-input";
import { authSchema } from "@/zod/auth-schema";

type FormValues = z.infer<typeof authSchema>;

export default function RegisterForm() {
  const t = useTranslations("AuthForm");
  const form = useForm<FormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
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
