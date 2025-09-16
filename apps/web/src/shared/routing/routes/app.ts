import type { RouteConfig } from "../types";

import { buildUrl } from "../utils";

// App route definitions
export const appRoutes = {
  home: { path: "/" },
  dashboard: { path: "/dashboard" },
  profile: { path: "/profile" },
  settings: { path: "/settings" },
  search: { path: "/search" },
  notifications: { path: "/notifications" },
} as const;

export class AppRouting {
  home(locale?: string, query?: { tab?: string }): string {
    return buildUrl(appRoutes.home, undefined, query, locale);
  }

  dashboard(locale?: string, query?: { tab?: string }): string {
    return buildUrl(appRoutes.dashboard, undefined, query, locale);
  }

  profile(locale?: string, query?: { tab?: string }): string {
    return buildUrl(appRoutes.profile, undefined, query, locale);
  }

  settings(locale?: string, query?: { section?: string }): string {
    return buildUrl(appRoutes.settings, undefined, query, locale);
  }

  search(
    locale?: string,
    query?: { q?: string; type?: "comics" | "users" }
  ): string {
    return buildUrl(appRoutes.search, undefined, query, locale);
  }

  notifications(
    locale?: string,
    query?: { filter?: "all" | "unread" }
  ): string {
    return buildUrl(appRoutes.notifications, undefined, query, locale);
  }

  // Utility methods
  getRouteConfig(routeKey: keyof typeof appRoutes): RouteConfig {
    return appRoutes[routeKey];
  }

  getAllRoutes(): Array<keyof typeof appRoutes> {
    return Object.keys(appRoutes) as Array<keyof typeof appRoutes>;
  }
}
