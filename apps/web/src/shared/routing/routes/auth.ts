import type { RouteConfig } from "../types";

import { buildUrl } from "../utils";

// Auth route definitions
export const authRoutes = {
  signin: { path: "/signin" },
  signup: { path: "/signup" },
  forgotPassword: { path: "/forgot-password" },
  logout: { path: "/logout" },
} as const;

export class AuthRouting {
  signin(locale?: string, query?: { redirectTo?: string }): string {
    return buildUrl(authRoutes.signin, undefined, query, locale);
  }

  signup(locale?: string, query?: { redirectTo?: string }): string {
    return buildUrl(authRoutes.signup, undefined, query, locale);
  }

  forgotPassword(locale?: string): string {
    return buildUrl(authRoutes.forgotPassword, undefined, undefined, locale);
  }

  logout(locale?: string): string {
    return buildUrl(authRoutes.logout, undefined, undefined, locale);
  }

  // Utility methods
  getRouteConfig(routeKey: keyof typeof authRoutes): RouteConfig {
    return authRoutes[routeKey];
  }

  getAllRoutes(): Array<keyof typeof authRoutes> {
    return Object.keys(authRoutes) as Array<keyof typeof authRoutes>;
  }
}
