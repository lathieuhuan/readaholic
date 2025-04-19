import { Input, type InputProps } from "@/lib/components/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function PasswordInput(props: Omit<InputProps, "type" | "action">) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      type={showPassword ? "text" : "password"}
      action={{
        className: "opacity-70 hover:opacity-90",
        children: showPassword ? <EyeOff size={20} /> : <Eye size={20} />,
        onClick: () => setShowPassword(!showPassword),
      }}
      {...props}
    />
  );
}
