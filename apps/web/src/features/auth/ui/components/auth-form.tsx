import { Button } from "@workspace/ui/button";
import { ReactNode } from "react";

interface AuthFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  children: ReactNode;
  submitText: string;
  isLoading?: boolean;
  error?: string;
  compact?: boolean;
}

export function AuthForm({
  onSubmit,
  children,
  submitText,
  isLoading,
  error,
  compact = false,
}: AuthFormProps) {
  return (
    <form action={onSubmit} className="space-y-4">
      {children}
      {error && (
        <div className="text-danger text-small text-center">{error}</div>
      )}
      <Button
        className="w-full"
        color="primary"
        isLoading={isLoading}
        size={compact ? "sm" : "md"}
        type="submit"
      >
        {submitText}
      </Button>
    </form>
  );
}
