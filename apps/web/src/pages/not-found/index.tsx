import { Button } from "@workspace/ui/button";
import { useTranslations } from "next-intl";

import { Routing } from "@/shared/routing";

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");

  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-background to-default-100 dark:to-background px-4">
      <div className="text-center space-y-8 max-w-2xl">
        {/* Large 404 Text */}
        <div className="space-y-4">
          <h1 className="text-9xl md:text-[12rem] font-black text-primary/20 dark:text-primary/40 leading-none select-none">
            404
          </h1>
          <div className="relative -mt-8 md:-mt-12">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground">
              {t("title")}
            </h2>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-6">
          <p className="text-lg md:text-xl text-default-600 leading-relaxed max-w-lg mx-auto">
            {t("description")}
          </p>

          {/* Decorative element */}
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-warning rounded-full" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button
            as="a"
            className="min-w-40"
            color="primary"
            href={Routing.app.home()}
            size="lg"
          >
            Go Home
          </Button>
          <Button
            as="a"
            className="min-w-40"
            color="default"
            href="javascript:history.back()"
            size="lg"
            variant="bordered"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
