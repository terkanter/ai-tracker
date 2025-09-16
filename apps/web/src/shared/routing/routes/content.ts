import type { RouteConfig } from "../types";

import { buildUrl } from "../utils";

// Content route definitions
export const contentRoutes = {
  comic: {
    path: "/comic/[id]",
    params: ["id"] as const,
    queryKeys: ["tab", "chapter"] as const,
  },
  chapter: {
    path: "/comic/[comicId]/chapter/[chapterId]",
    params: ["comicId", "chapterId"] as const,
    queryKeys: ["page"] as const,
  },
  user: {
    path: "/user/[username]",
    params: ["username"] as const,
    queryKeys: ["tab"] as const,
  },
  genre: {
    path: "/genre/[slug]",
    params: ["slug"] as const,
    queryKeys: ["sort", "page"] as const,
  },
  tag: {
    path: "/tag/[slug]",
    params: ["slug"] as const,
    queryKeys: ["sort", "page"] as const,
  },
} as const;

export class ContentRouting {
  comic(
    params: { id: string | number },
    locale?: string,
    query?: {
      tab?: "info" | "chapters" | "reviews";
      chapter?: string | number;
    }
  ): string {
    return buildUrl(contentRoutes.comic, params, query, locale);
  }

  chapter(
    params: { comicId: string | number; chapterId: string | number },
    locale?: string,
    query?: { page?: string | number }
  ): string {
    return buildUrl(contentRoutes.chapter, params, query, locale);
  }

  user(
    params: { username: string },
    locale?: string,
    query?: { tab?: "comics" | "reviews" | "favorites" }
  ): string {
    return buildUrl(contentRoutes.user, params, query, locale);
  }

  genre(
    params: { slug: string },
    locale?: string,
    query?: { sort?: "popular" | "recent" | "rating"; page?: string | number }
  ): string {
    return buildUrl(contentRoutes.genre, params, query, locale);
  }

  tag(
    params: { slug: string },
    locale?: string,
    query?: { sort?: "popular" | "recent" | "rating"; page?: string | number }
  ): string {
    return buildUrl(contentRoutes.tag, params, query, locale);
  }

  // Utility methods
  getRouteConfig(routeKey: keyof typeof contentRoutes): RouteConfig {
    return contentRoutes[routeKey];
  }

  getAllRoutes(): Array<keyof typeof contentRoutes> {
    return Object.keys(contentRoutes) as Array<keyof typeof contentRoutes>;
  }
}
