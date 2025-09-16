import { useLocale } from "next-intl";

import { AppRouting } from "../routes/app";

import { useRouter } from "@/shared/i18n/navigation";

const appRouting = new AppRouting();

interface UseAppRoutingReturn {
  // Navigation methods
  goHome: (query?: { tab?: string }) => void;
  goDashboard: (query?: { tab?: string }) => void;
  goProfile: (query?: { tab?: string }) => void;
  goSettings: (query?: { section?: string }) => void;
  goSearch: (query?: { q?: string; type?: "comics" | "users" }) => void;
  goNotifications: (query?: { filter?: "all" | "unread" }) => void;

  // URL generators
  getHomeUrl: (query?: { tab?: string }) => string;
  getDashboardUrl: (query?: { tab?: string }) => string;
  getProfileUrl: (query?: { tab?: string }) => string;
  getSettingsUrl: (query?: { section?: string }) => string;
  getSearchUrl: (query?: { q?: string; type?: "comics" | "users" }) => string;
  getNotificationsUrl: (query?: { filter?: "all" | "unread" }) => string;
}

export function useAppRouting(): UseAppRoutingReturn {
  const router = useRouter();
  const locale = useLocale();

  return {
    // Navigation methods
    goHome: (query) => router.push(appRouting.home(locale, query)),
    goDashboard: (query) => router.push(appRouting.dashboard(locale, query)),
    goProfile: (query) => router.push(appRouting.profile(locale, query)),
    goSettings: (query) => router.push(appRouting.settings(locale, query)),
    goSearch: (query) => router.push(appRouting.search(locale, query)),
    goNotifications: (query) =>
      router.push(appRouting.notifications(locale, query)),

    // URL generators
    getHomeUrl: (query) => appRouting.home(locale, query),
    getDashboardUrl: (query) => appRouting.dashboard(locale, query),
    getProfileUrl: (query) => appRouting.profile(locale, query),
    getSettingsUrl: (query) => appRouting.settings(locale, query),
    getSearchUrl: (query) => appRouting.search(locale, query),
    getNotificationsUrl: (query) => appRouting.notifications(locale, query),
  };
}
