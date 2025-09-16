import { useLocale } from "next-intl";

import { ContentRouting } from "../routes/content";

import { useRouter } from "@/shared/i18n/navigation";

const contentRouting = new ContentRouting();

interface UseContentRoutingReturn {
  // Navigation methods
  goComic: (
    params: { id: string | number },
    query?: {
      tab?: "info" | "chapters" | "reviews";
      chapter?: string | number;
    }
  ) => void;
  goChapter: (
    params: { comicId: string | number; chapterId: string | number },
    query?: { page?: string | number }
  ) => void;
  goUser: (
    params: { username: string },
    query?: { tab?: "comics" | "reviews" | "favorites" }
  ) => void;
  goGenre: (
    params: { slug: string },
    query?: { sort?: "popular" | "recent" | "rating"; page?: string | number }
  ) => void;
  goTag: (
    params: { slug: string },
    query?: { sort?: "popular" | "recent" | "rating"; page?: string | number }
  ) => void;

  // URL generators
  getComicUrl: (
    params: { id: string | number },
    query?: {
      tab?: "info" | "chapters" | "reviews";
      chapter?: string | number;
    }
  ) => string;
  getChapterUrl: (
    params: { comicId: string | number; chapterId: string | number },
    query?: { page?: string | number }
  ) => string;
  getUserUrl: (
    params: { username: string },
    query?: { tab?: "comics" | "reviews" | "favorites" }
  ) => string;
  getGenreUrl: (
    params: { slug: string },
    query?: { sort?: "popular" | "recent" | "rating"; page?: string | number }
  ) => string;
  getTagUrl: (
    params: { slug: string },
    query?: { sort?: "popular" | "recent" | "rating"; page?: string | number }
  ) => string;
}

export function useContentRouting(): UseContentRoutingReturn {
  const router = useRouter();
  const locale = useLocale();

  return {
    // Navigation methods
    goComic: (params, query) =>
      router.push(contentRouting.comic(params, locale, query)),
    goChapter: (params, query) =>
      router.push(contentRouting.chapter(params, locale, query)),
    goUser: (params, query) =>
      router.push(contentRouting.user(params, locale, query)),
    goGenre: (params, query) =>
      router.push(contentRouting.genre(params, locale, query)),
    goTag: (params, query) =>
      router.push(contentRouting.tag(params, locale, query)),

    // URL generators
    getComicUrl: (params, query) => contentRouting.comic(params, locale, query),
    getChapterUrl: (params, query) =>
      contentRouting.chapter(params, locale, query),
    getUserUrl: (params, query) => contentRouting.user(params, locale, query),
    getGenreUrl: (params, query) => contentRouting.genre(params, locale, query),
    getTagUrl: (params, query) => contentRouting.tag(params, locale, query),
  };
}
