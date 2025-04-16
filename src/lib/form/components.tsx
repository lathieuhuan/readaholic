"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { ClassValue } from "clsx";
import * as React from "react";

import { Label } from "@/lib/components/label";
import { cn } from "@/lib/utils/functions";

type FormItemProps = Omit<React.ComponentProps<"div">, "className"> & {
  className?: ClassValue;
};

function FormItem({ className, ...props }: FormItemProps) {
  return (
    <div data-slot="form-item" className={cn("flex flex-col gap-1.5", className)} {...props} />
  );
}

function FormLabel({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <Label
      data-slot="form-label"
      className={cn("data-[error=true]:text-destructive", className)}
      {...props}
    />
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  return <Slot data-slot="form-control" {...props} />;
}

// function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
//   const { formDescriptionId } = useFormField();

//   return (
//     <p
//       data-slot="form-description"
//       id={formDescriptionId}
//       className={cn("text-muted-foreground text-sm", className)}
//       {...props}
//     />
//   );
// }

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="form-message"
      className={cn("-mt-0.5 text-destructive text-xs", className)}
      {...props}
    />
  );
}

export {
  FormControl,
  // FormDescription,
  FormItem,
  FormLabel,
  FormMessage
};

