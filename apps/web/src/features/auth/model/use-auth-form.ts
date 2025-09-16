"use client";

import { useState } from "react";

import { useRouter } from "@/shared/i18n/navigation";
import { Routing } from "@/shared/routing";

interface UseAuthFormOptions {
  redirectTo?: string | null;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

interface UseAuthFormReturn {
  isLoading: boolean;
  error: string;
  executeAuth: (authAction: () => Promise<unknown>) => Promise<void>;
  clearError: () => void;
  setError: (error: string) => void;
}

const DEFAULT_REDIRECT_TO = Routing.app.home();

export function useAuthForm(
  options: UseAuthFormOptions = {}
): UseAuthFormReturn {
  const { redirectTo = DEFAULT_REDIRECT_TO, onSuccess, onError } = options;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const executeAuth = async (authAction: () => Promise<unknown>) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await authAction();

      if (
        result &&
        typeof result === "object" &&
        "error" in result &&
        result.error
      ) {
        const errorMessage =
          (result.error as { message?: string })?.message ||
          "Authentication failed";

        setError(errorMessage);
        onError?.(errorMessage);
      } else {
        onSuccess?.();

        if (redirectTo) {
          router.push(redirectTo);
          router.refresh();
        }
      }
    } catch {
      const errorMessage = "An unexpected error occurred";

      setError(errorMessage);

      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError("");
  };

  return {
    isLoading,
    error,
    executeAuth,
    clearError,
    setError,
  };
}
