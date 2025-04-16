import clsx, { type ClassValue } from "clsx";
import { useId, cloneElement } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

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
  const formItemId = `${id}-form-item`;
  const formMessageId = `${id}-form-item-message`;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
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
          <FormMessage id={formMessageId}>{error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}
