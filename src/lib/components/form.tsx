"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { ClassValue } from "clsx";
import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  UseFormReturn,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { cn } from "@/lib/utils/functions";
import { Label } from "./label";

const Form = <TFieldValues extends FieldValues = FieldValues>({
  children,
  form,
  onSubmit,
  className,
}: {
  form: UseFormReturn<TFieldValues>;
  className?: string;
  children: React.ReactNode;
  onSubmit: (data: TFieldValues) => void;
}) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
};

// type FormFieldContextValue<
//   TFieldValues extends FieldValues = FieldValues,
//   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
// > = {
//   name: TName;
// };

// const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

// const FormField = <
//   TFieldValues extends FieldValues = FieldValues,
//   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
// >({
//   ...props
// }: ControllerProps<TFieldValues, TName>) => {
//   return (
//     <FormFieldContext.Provider value={{ name: props.name }}>
//       <Controller {...props} />
//     </FormFieldContext.Provider>
//   );
// };

const useFormField = () => {
  // const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

type FormItemProps = Omit<React.ComponentProps<"div">, "className"> & {
  className?: ClassValue;
};

function FormItem({ className, ...props }: FormItemProps) {
  return (
    <div data-slot="form-item" className={cn("flex flex-col gap-1.5", className)} {...props} />
  );

  // const id = React.useId();

  // return (
  //   <FormItemContext.Provider value={{ id }}>
  //     <div data-slot="form-item" className={cn("flex flex-col gap-1.5", className)} {...props} />
  //   </FormItemContext.Provider>
  // );
}

function FormLabel({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  // const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      // data-error={isError}
      className={cn("data-[error=true]:text-destructive", className)}
      // htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  // const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      data-slot="form-control"
      // id={formItemId}
      // aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      // aria-invalid={!!error}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();
  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("-mt-0.5 text-destructive text-xs", className)}
      {...props}
    >
      {error?.message}
    </p>
  );
}

export {
  Form,
  FormControl,
  FormDescription,
  // FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
};
