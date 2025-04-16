"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { Input } from "@/lib/components/input";
import { Form, FormField } from "@/lib/form";
import { authSchema, type AuthSchemaType } from "@/zod/auth-schema";

export default function RegisterForm() {
  const t = useTranslations("AuthForm");
  const form = useForm<AuthSchemaType>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = (data: AuthSchemaType) => {
    console.log(data);
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <FormField control={form.control} name="username" label={t("username")}>
        <Input placeholder={t("username")} />
      </FormField>

      <FormField control={form.control} name="password" label={t("password")}>
        <Input placeholder={t("password")} />
      </FormField>
    </Form>
  );
}
