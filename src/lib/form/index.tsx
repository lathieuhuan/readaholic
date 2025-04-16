import { FormProvider, UseFormReturn, type FieldValues } from "react-hook-form";
import { FormField } from "./form-field";

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

export { Form, FormField };
