"use client";

import { useTranslations } from "next-intl";

import { useAuthModalStore } from "../../../../shared/auth/auth-modal-store";
import { useForgotPassword } from "../../model/use-forgot-password";
import { AuthFooter } from "../components/auth-footer";
import { AuthForm } from "../components/auth-form";
import { EmailField } from "../components/form-fields";

export function ForgotPasswordFormModal() {
  const { isLoading, error, success, sendResetEmail } = useForgotPassword();
  const { switchMode } = useAuthModalStore();
  const t = useTranslations("Auth.forgotPassword");

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div>
          <h2 className="text-lg font-semibold">{t("successTitle")}</h2>
          <p className="text-small text-default-500 mt-2">
            {t("successDescription")}
          </p>
        </div>
        <AuthFooter
          compact
          text=""
          linkText={t("backToSignin")}
          onLinkClick={() => switchMode("signin")}
        />
      </div>
    );
  }

  return (
    <>
      <AuthForm
        compact
        error={error}
        isLoading={isLoading}
        submitText={t("submitButton")}
        onSubmit={sendResetEmail}
      >
        <EmailField compact error={error} />
      </AuthForm>
      <div className="mt-4">
        <AuthFooter
          compact
          text={t("footerText")}
          linkText={t("footerLink")}
          onLinkClick={() => switchMode("signin")}
        />
      </div>
    </>
  );
}
