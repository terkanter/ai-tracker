import { Metadata, Viewport } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Providers } from "../../src/app/providers";

import Document from "@/app/document";
import { DefaultLayout } from "@/app/layouts/default-layout";
import { Modals } from "@/app/modals";
import { routing } from "@/shared/i18n/routing";
import { generateMeta } from "@/shared/utils/generateMeta";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations({
    locale: routing.defaultLocale,
    namespace: "meta",
  });

  return generateMeta({
    meta: {
      title: t("title"),
      description: t("description"),
      keywords: [],
      image: "",
    },
    slug: "/",
  });
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`@/shared/i18n/locales/${locale}.json`))
    .default;

  return (
    <Document locale={locale}>
      <Providers
        locale={locale}
        messages={messages}
        themeProps={{ attribute: "class", defaultTheme: "dark" }}
      >
        <DefaultLayout>{children}</DefaultLayout>
        <Modals />
      </Providers>
    </Document>
  );
}
