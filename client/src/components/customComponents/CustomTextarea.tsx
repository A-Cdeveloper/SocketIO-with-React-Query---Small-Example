import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import InputError from "./InputError";

type CustomTextareaProps = React.ComponentProps<"textarea"> & {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
};

function CustomTextarea({
  label,
  error,
  required = false,
  className,
  id,
  ...props
}: CustomTextareaProps) {
  const textareaId =
    id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={textareaId} className="mb-2 text-foreground/50">
        {label}
        {required && <span className="text-destructive -ml-[5px]">*</span>}
      </Label>
      <Textarea
        {...props}
        id={textareaId}
        className={cn("rounded-none", className)}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        aria-required={required}
      />
      <InputError error={error} id={`${textareaId}-error`} />
    </div>
  );
}

export { CustomTextarea };
