"use client";

import { useTranslations } from "next-intl";

import { useSignUp } from "../../model/use-sign-up";
import { AuthCard } from "../components/auth-card";
import { AuthFooter } from "../components/auth-footer";
import { AuthForm } from "../components/auth-form";
import {
  EmailField,
  NameField,
  PasswordField,
  TermsCheckbox,
  UsernameField,
} from "../components/form-fields";

import { Routing } from "@/shared/routing";

export function SignUpForm() {
  const { isLoading, error, signUp } = useSignUp();
  const t = useTranslations("Auth.signup");

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
        onSubmit={signUp}
      >
        <NameField />
        <EmailField />
        <UsernameField />
        <PasswordField placeholder={t("passwordPlaceholder")} />
        <PasswordField
          label={t("confirmPassword")}
          name="confirmPassword"
          placeholder={t("confirmPasswordPlaceholder")}
        />
        <TermsCheckbox />
      </AuthForm>
    </AuthCard>
  );
}
