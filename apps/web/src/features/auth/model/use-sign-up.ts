"use client";

import { useTranslations } from "next-intl";

import { useAuthForm } from "./use-auth-form";

import { authClient } from "@/shared/auth/auth-client";

interface UseSignUpReturn {
  isLoading: boolean;
  error: string;
  signUp: (formData: FormData) => Promise<void>;
}

export function useSignUp(): UseSignUpReturn {
  const { isLoading, error, executeAuth, setError } = useAuthForm();
  const t = useTranslations("Auth.signup.errors");

  const signUp = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const acceptTerms = formData.get("acceptTerms") === "on";

    // Pre-validation
    if (password !== confirmPassword) {
      setError(t("passwordMismatch"));

      return;
    }

    if (!acceptTerms) {
      setError(t("termsRequired"));

      return;
    }

    await executeAuth(() =>
      authClient.signUp.email({
        name,
        email,
        username,
        password,
      })
    );
  };

  return {
    isLoading,
    error,
    signUp,
  };
}
