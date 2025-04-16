import { ClassValue } from "clsx";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/form";
import { Input, type InputProps } from "../components/input";
import { useFormField } from "./use-form-field";

type FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Pick<InputProps, "maxLength"> & {
  control: Control<TFieldValues, any>;
  name: TName;
  label: string;
  placeholder?: string;
  className?: ClassValue;
};

export function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name, label, placeholder, className, ...rest }: FormInputProps<TFieldValues, TName>) {
  //
  const { id, formItemId, error, formDescriptionId, formMessageId } = useFormField(name);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem id={id} className={className}>
          <FormLabel htmlFor={formItemId} data-error={!!error}>
            {label}
          </FormLabel>
          <FormControl
            id={formItemId}
            aria-describedby={
              !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
          >
            <Input placeholder={placeholder} {...field} {...rest} />
          </FormControl>
          {/* <FormDescription>This is your public display name.</FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} {...rest} />
          </FormControl>
          {/* <FormDescription>This is your public display name.</FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
