import { Control, FieldPath, FieldValues } from "react-hook-form";
import { ClassValue } from "clsx";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input, type InputProps } from "./input";

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
