"use client";

import { useTranslations } from "next-intl";

import { useSignIn } from "../../model/use-sign-in";
import { AuthCard } from "../components/auth-card";
import { AuthFooter } from "../components/auth-footer";
import { AuthForm } from "../components/auth-form";
import {
  EmailField,
  PasswordField,
  RememberMeField,
} from "../components/form-fields";

import { Routing } from "@/shared/routing";

export function SignInForm() {
  const { isLoading, error, signIn } = useSignIn();
  const t = useTranslations("Auth.signin");

  return (
    <AuthCard
      description={t("description")}
      footer={
        <AuthFooter
          linkHref={Routing.auth.signup()}
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
        onSubmit={signIn}
      >
        <EmailField error={error} />
        <PasswordField />
        <RememberMeField />
      </AuthForm>
    </AuthCard>
  );
}
