"use client";

import { useTranslations } from "next-intl";

import { useAuthModalStore } from "../../../../shared/auth/auth-modal-store";
import { useSignIn } from "../../model/use-sign-in";
import { AuthFooter } from "../components/auth-footer";
import { AuthForm } from "../components/auth-form";
import {
  EmailField,
  PasswordField,
  RememberMeField,
} from "../components/form-fields";

export function SignInFormModal() {
  const { isLoading, error, signIn } = useSignIn();
  const { switchMode } = useAuthModalStore();
  const t = useTranslations("Auth.signin");

  return (
    <>
      <AuthForm
        compact
        error={error}
        isLoading={isLoading}
        submitText={t("submitButton")}
        onSubmit={signIn}
      >
        <EmailField compact error={error} />
        <PasswordField compact />
        <RememberMeField
          compact
          onForgotPasswordClick={() => switchMode("forgot-password")}
        />
      </AuthForm>
      <div className="mt-4">
        <AuthFooter
          compact
          text={t("footerText")}
          linkText={t("footerLink")}
          onLinkClick={() => switchMode("signup")}
        />
      </div>
    </>
  );
}
