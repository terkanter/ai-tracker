import { useAuthForm } from "./use-auth-form";

import { authClient } from "@/shared/auth/auth-client";

interface UseLogoutReturn {
  isLoading: boolean;
  logout: () => Promise<void>;
}

export function useLogout(): UseLogoutReturn {
  const { isLoading, executeAuth } = useAuthForm();

  const logout = async () => {
    await executeAuth(() => authClient.signOut());
  };

  return {
    isLoading,
    logout,
  };
}
