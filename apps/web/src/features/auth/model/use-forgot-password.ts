"use client";

import { useState } from "react";

import { useAuthForm } from "./use-auth-form";

// TODO: Restore authClient import when auth is set up
// import { authClient } from "@/shared/auth/auth-client";

interface UseForgotPasswordReturn {
  isLoading: boolean;
  error: string;
  success: boolean;
  sendResetEmail: (formData: FormData) => Promise<void>;
}

export function useForgotPassword(): UseForgotPasswordReturn {
  const [success, setSuccess] = useState(false);

  const { isLoading, error, executeAuth } = useAuthForm({
    redirectTo: null, // Don't redirect on success
    onSuccess: () => setSuccess(true),
  });

  const sendResetEmail = async (formData: FormData) => {
    const email = formData.get("email") as string;

    // TODO: Replace with actual authClient when available
    await executeAuth(
      () => Promise.resolve({ success: true }) // Placeholder
    );
  };

  return {
    isLoading,
    error,
    success,
    sendResetEmail,
  };
}
