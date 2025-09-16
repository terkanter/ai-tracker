"use client";

import type { ThemeProviderProps } from "next-themes";

import { Providers as UIProviders } from "@workspace/ui/providers";
import { NextIntlClientProvider } from "next-intl";
import * as React from "react";

import { QueryClientProvider } from "./query-client-provider";

import { useRouter } from "@/shared/i18n/navigation";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  messages: Record<string, string>;
  locale: string;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

function UIProvidersWithIntlRouter({
  children,
  themeProps,
}: {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}) {
  const router = useRouter();

  return (
    <UIProviders navigate={router.push} themeProviderProps={themeProps}>
      {children}
    </UIProviders>
  );
}

export function Providers({
  children,
  themeProps,
  messages,
  locale,
}: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <UIProvidersWithIntlRouter themeProps={themeProps}>
        <QueryClientProvider>{children}</QueryClientProvider>
      </UIProvidersWithIntlRouter>
    </NextIntlClientProvider>
  );
}
