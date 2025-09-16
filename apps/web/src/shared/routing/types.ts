export interface RouteParams {
  locale?: string;
  [key: string]: string | number | undefined;
}

export interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}

export interface RouteConfig {
  path: string;
  params?: readonly string[];
  queryKeys?: readonly string[];
}

export type RouteKey = string;
