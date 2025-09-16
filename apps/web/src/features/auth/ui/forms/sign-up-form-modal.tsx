"use client";

import { useTranslations } from "next-intl";

import { useAuthModalStore } from "../../../../shared/auth/auth-modal-store";
import { useSignUp } from "../../model/use-sign-up";
import { AuthFooter } from "../components/auth-footer";
import { AuthForm } from "../components/auth-form";
import {
  EmailField,
  NameField,
  PasswordField,
  TermsCheckbox,
  UsernameField,
} from "../components/form-fields";

export function SignUpFormModal() {
  const { isLoading, error, signUp } = useSignUp();
  const { switchMode } = useAuthModalStore();
  const t = useTranslations("Auth.signup");

  return (
    <>
      <AuthForm
        compact
        error={error}
        isLoading={isLoading}
        submitText={t("submitButton")}
        onSubmit={signUp}
      >
        <NameField compact />
        <EmailField compact />
        <UsernameField compact />
        <PasswordField compact placeholder={t("passwordPlaceholder")} />
        <PasswordField
          compact
          label={t("confirmPassword")}
          name="confirmPassword"
          placeholder={t("confirmPasswordPlaceholder")}
        />
        <TermsCheckbox compact />
      </AuthForm>
      <div className="mt-4">
        <AuthFooter
          compact
          linkText={t("footerLink")}
          text={t("footerText")}
          onLinkClick={() => switchMode("signin")}
        />
      </div>
    </>
  );
}
