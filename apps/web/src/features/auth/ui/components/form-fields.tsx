import { Checkbox } from "@workspace/ui/checkbox";
import { Input } from "@workspace/ui/input";
import { Link as HeroUILink } from "@workspace/ui/link";
import { useTranslations } from "next-intl";

import { Link } from "@/shared/i18n/navigation";
import { Routing } from "@/shared/routing";

interface EmailFieldProps {
  error?: string;
  compact?: boolean;
}

export function EmailField({ error, compact = false }: EmailFieldProps) {
  const t = useTranslations("Auth.signin");

  return (
    <Input
      isRequired
      errorMessage={error}
      isInvalid={!!error}
      label={t("email")}
      name="email"
      placeholder={t("emailPlaceholder")}
      size={compact ? "sm" : "md"}
      type="email"
    />
  );
}

interface PasswordFieldProps {
  label?: string;
  name?: string;
  placeholder?: string;
  compact?: boolean;
}

export function PasswordField({
  label,
  name = "password",
  placeholder,
  compact = false,
}: PasswordFieldProps) {
  const t = useTranslations("Auth.signin");

  return (
    <Input
      isRequired
      label={label || t("password")}
      name={name}
      placeholder={placeholder || t("passwordPlaceholder")}
      size={compact ? "sm" : "md"}
      type="password"
    />
  );
}

interface NameFieldProps {
  compact?: boolean;
}

export function NameField({ compact = false }: NameFieldProps) {
  const t = useTranslations("Auth.signup");

  return (
    <Input
      isRequired
      label={t("name")}
      name="name"
      placeholder={t("namePlaceholder")}
      size={compact ? "sm" : "md"}
    />
  );
}

interface UsernameFieldProps {
  compact?: boolean;
}

export function UsernameField({ compact = false }: UsernameFieldProps) {
  const t = useTranslations("Auth.signup");

  return (
    <Input
      isRequired
      label={t("username")}
      name="username"
      placeholder={t("usernamePlaceholder")}
      size={compact ? "sm" : "md"}
    />
  );
}

interface RememberMeFieldProps {
  onForgotPasswordClick?: () => void;
  compact?: boolean;
}

export function RememberMeField({
  onForgotPasswordClick,
  compact: _compact = false,
}: RememberMeFieldProps) {
  const t = useTranslations("Auth.signin");

  return (
    <div className="flex items-center justify-between">
      <Checkbox name="rememberMe" size="sm">
        {t("rememberMe")}
      </Checkbox>
      {onForgotPasswordClick ? (
        <button
          className="text-primary hover:text-primary-600 text-small underline"
          type="button"
          onClick={onForgotPasswordClick}
        >
          {t("forgotPassword")}
        </button>
      ) : (
        <HeroUILink href={Routing.auth.forgotPassword()} size="sm">
          {t("forgotPassword")}
        </HeroUILink>
      )}
    </div>
  );
}

interface TermsCheckboxProps {
  compact?: boolean;
}

export function TermsCheckbox({ compact = false }: TermsCheckboxProps) {
  const t = useTranslations("Auth.signup");

  return (
    <div className="space-y-2">
      <Checkbox name="acceptTerms" size="sm">
        <span className={compact ? "text-tiny" : "text-small"}>
          {t.rich("acceptTerms", {
            termsLink: (chunks) => (
              <Link className="text-primary" href="/terms">
                {chunks}
              </Link>
            ),
            privacyLink: (chunks) => (
              <Link className="text-primary" href="/privacy">
                {chunks}
              </Link>
            ),
          })}
        </span>
      </Checkbox>
    </div>
  );
}
