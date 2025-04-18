import clsx, { type ClassValue } from "clsx";
import { useTranslations } from "next-intl";
import { cloneElement, useId } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import { ErrorDecoder } from "@/lib/utils/error-process";
import { FormControl, FormItem, FormLabel, FormMessage } from "./components";

type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues, any>;
  name: TName;
  label: string;
  placeholder?: string;
  className?: ClassValue;
  children: React.JSX.Element;
};

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name, label, className, children }: FormFieldProps<TFieldValues, TName>) {
  const id = useId();
  const t = useTranslations("Errors");
  const formItemId = `${id}-form-item`;
  const formMessageId = `${id}-form-item-message`;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        let errorMsg = "";

        if (error?.message) {
          const decodedError = ErrorDecoder.decode(error.message);
          errorMsg = t(decodedError.key, decodedError.params);
        }

        return (
          <FormItem id={id} className={className}>
            <FormLabel htmlFor={formItemId} data-error={!!error}>
              {label}
            </FormLabel>
            <FormControl
              id={formItemId}
              aria-describedby={clsx(`${id}-form-item-description`, error ? formMessageId : "")}
              aria-invalid={!!error}
            >
              {cloneElement(children, Object.assign({}, children.props, field))}
            </FormControl>
            {/* <FormDescription>This is your public display name.</FormDescription> */}
            <FormMessage id={formMessageId}>{errorMsg}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
}
