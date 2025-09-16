import type { QueryParams, RouteConfig, RouteParams } from "./types";

export function buildUrl(
  routeConfig: RouteConfig,
  params?: RouteParams,
  query?: QueryParams,
  locale?: string
): string {
  let path = routeConfig.path;

  // Replace path parameters
  if (routeConfig.params && params) {
    routeConfig.params.forEach((paramKey) => {
      if (params[paramKey] !== undefined) {
        path = path.replace(`[${paramKey}]`, String(params[paramKey]));
      }
    });
  }

  // Add locale prefix if provided
  if (locale) {
    path = `/${locale}${path}`;
  }

  // Add query parameters
  if (query && Object.keys(query).length > 0) {
    const queryString = Object.entries(query)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
      .join("&");

    if (queryString) {
      path += `?${queryString}`;
    }
  }

  return path;
}

export function isCurrentRoute(
  routeConfig: RouteConfig,
  currentPath: string
): boolean {
  const pathPattern = routeConfig.path.replace(/\[([^\]]+)\]/g, "([^/]+)");
  const regex = new RegExp(`^${pathPattern}$`);

  return regex.test(currentPath);
}
