import { useTranslations } from "next-intl";

import { useAuthForm } from "./use-auth-form";

import { authClient } from "@/shared/auth/auth-client";

interface UseSignInReturn {
  isLoading: boolean;
  error: string;
  signIn: (formData: FormData) => Promise<void>;
}

export function useSignIn(): UseSignInReturn {
  const { isLoading, error, executeAuth } = useAuthForm();
  const t = useTranslations("Auth.signin.errors");

  const signIn = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const rememberMe = formData.get("rememberMe") === "on";

    await executeAuth(() =>
      authClient.signIn.email({
        email,
        password,
      })
    );
  };

  return {
    isLoading,
    error,
    signIn,
  };
}
