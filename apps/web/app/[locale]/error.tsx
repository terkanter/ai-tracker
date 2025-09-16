"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

type Props = {
  error: Error;
  reset(): void;
};

export default function Error({ error, reset }: Props) {
  const t = useTranslations("Error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>{t("title")}</h1>
      <div>
        {t.rich("description", {
          p: (chunks) => <p className="mt-4">{chunks}</p>,
          retry: (chunks) => (
            <button
              className="text-white underline underline-offset-2"
              type="button"
              onClick={reset}
            >
              {chunks}
            </button>
          ),
        })}
      </div>
    </div>
  );
}
