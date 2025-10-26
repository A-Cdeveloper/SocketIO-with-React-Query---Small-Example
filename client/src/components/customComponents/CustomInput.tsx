import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import InputError from "./InputError";

type CustomInputProps = React.ComponentProps<"input"> & {
  label?: string;
  type?: "text" | "password" | "number" | "email";
  error?: string;
  required?: boolean;
  className?: string;
};

function CustomInput({
  label,
  type = "text",
  error,
  required = false,
  className,
  id,
  ...props
}: CustomInputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={inputId} className="mb-2 text-foreground/50">
          {label}
          {required && <span className="text-destructive -ml-[5px]">*</span>}
        </Label>
      )}
      <Input
        {...props}
        id={inputId}
        type={type}
        className={cn("rounded-none", className)}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${inputId}-error` : undefined}
        aria-required={required}
      />
      <InputError error={error} id={`${inputId}-error`} />
    </div>
  );
}

export { CustomInput };
