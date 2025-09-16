import { useLocale } from "next-intl";

import { AuthRouting } from "../routes/auth";

import { useRouter } from "@/shared/i18n/navigation";

const authRouting = new AuthRouting();

interface UseAuthRoutingReturn {
  // Navigation methods
  goSignIn: (query?: { redirectTo?: string }) => void;
  goSignUp: (query?: { redirectTo?: string }) => void;
  goForgotPassword: () => void;
  goLogout: () => void;

  // URL generators
  getSignInUrl: (query?: { redirectTo?: string }) => string;
  getSignUpUrl: (query?: { redirectTo?: string }) => string;
  getForgotPasswordUrl: () => string;
  getLogoutUrl: () => string;
}

export function useAuthRouting(): UseAuthRoutingReturn {
  const router = useRouter();
  const locale = useLocale();

  return {
    // Navigation methods
    goSignIn: (query) => router.push(authRouting.signin(locale, query)),
    goSignUp: (query) => router.push(authRouting.signup(locale, query)),
    goForgotPassword: () => router.push(authRouting.forgotPassword(locale)),
    goLogout: () => router.push(authRouting.logout(locale)),

    // URL generators
    getSignInUrl: (query) => authRouting.signin(locale, query),
    getSignUpUrl: (query) => authRouting.signup(locale, query),
    getForgotPasswordUrl: () => authRouting.forgotPassword(locale),
    getLogoutUrl: () => authRouting.logout(locale),
  };
}
