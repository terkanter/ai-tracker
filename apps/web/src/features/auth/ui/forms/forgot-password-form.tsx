"use client";

import { Link } from "@workspace/ui/link";
import { useTranslations } from "next-intl";

import { useForgotPassword } from "../../model/use-forgot-password";

import { Routing } from "@/shared/routing";
import { AuthCard } from "../components/auth-card";
import { AuthFooter } from "../components/auth-footer";
import { AuthForm } from "../components/auth-form";
import { EmailField } from "../components/form-fields";

export function ForgotPasswordForm() {
  const { isLoading, error, success, sendResetEmail } = useForgotPassword();
  const t = useTranslations("Auth.forgotPassword");

  if (success) {
    return (
      <AuthCard
        description={t("successDescription")}
        footer={
          <div className="text-center w-full">
            <Link href={Routing.auth.signin()} size="sm">
              {t("backToSignin")}
            </Link>
          </div>
        }
        title={t("successTitle")}
      />
    );
  }

  return (
    <AuthCard
      description={t("description")}
      footer={
        <AuthFooter
          linkHref={Routing.auth.signin()}
          linkText={t("footerLink")}
          text={t("footerText")}
        />
      }
      title={t("title")}
    >
      <AuthForm
        error={error}
        isLoading={isLoading}
        submitText={t("submitButton")}
        onSubmit={sendResetEmail}
      >
        <EmailField error={error} />
      </AuthForm>
    </AuthCard>
  );
}
