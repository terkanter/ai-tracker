"use client";

import { Button } from "@workspace/ui/button";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { useLogout } from "../../model/use-logout";

import { AuthCard } from "../components/auth-card";

export function LogoutForm() {
  const { isLoading, logout } = useLogout();
  const t = useTranslations("Auth.logout");

  // Auto-logout on mount
  useEffect(() => {
    logout();
  }, []);

  return (
    <AuthCard
      description={isLoading ? t("description") : t("descriptionFailed")}
      title={isLoading ? t("title") : t("titleFailed")}
    >
      {!isLoading && (
        <Button
          className="w-full"
          color="primary"
          isLoading={isLoading}
          onClick={logout}
        >
          {t("tryAgain")}
        </Button>
      )}
    </AuthCard>
  );
}
