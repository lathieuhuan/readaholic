import { useId } from "react";
import { useFormContext, useFormState } from "react-hook-form";

export const useFormField = (name: string) => {
  const id = useId();
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name });
  const fieldState = getFieldState(name, formState);

  return {
    id,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};
