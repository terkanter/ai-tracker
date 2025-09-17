import { Loading } from "@workspace/admin/loading";
import { Button } from "@workspace/ui/button";
import { cn } from "@workspace/ui/lib/utils";
import { CircleAlert, LockIcon } from "lucide-react";
import { Translate, useHandleAuthCallback, useTranslate } from "ra-core";
import { Link } from "react-router";

/**
 * A standalone page to be used in a route called by external authentication services (e.g. OAuth)
 * after the user has been authenticated.
 *
 * Copy and adapt this component to implement your own login logic
 * (e.g. to show a different waiting screen, start onboarding procedures, etc.).
 *
 * @example
 *     import MyAuthCallbackPage from './MyAuthCallbackPage';
 *     const App = () => (
 *         <Admin authCallbackPage={MyAuthCallbackPage} authProvider={authProvider}>
 *             ...
 *         </Admin>
 *     );
 */
export function AuthCallback() {
  const { error } = useHandleAuthCallback();

  if (error) {
    return (
      <AuthError
        message={(error as Error) ? (error as Error).message : undefined}
      />
    );
  }

  return <Loading />;
}

export interface AuthErrorProps {
  className?: string;
  title?: string;
  message?: string;
}

export function AuthError(props: AuthErrorProps) {
  const {
    className,
    title = "ra.page.error",
    message = "ra.message.auth_error",
    ...rest
  } = props;

  const translate = useTranslate();

  return (
    <div
      className={cn(
        "flex h-full flex-col items-center justify-center",
        className,
      )}
      {...rest}
    >
      <h1 className="my-5 flex items-center gap-3 text-3xl" role="alert">
        <CircleAlert className="w-2em h-2em" />
        <Translate i18nKey={title} />
      </h1>
      <p className="my-5">{translate(message, { _: message })}</p>
      <Button asChild>
        <Link to="/login">
          <LockIcon /> {translate("ra.auth.sign_in", { _: "Sign in" })}
        </Link>
      </Button>
    </div>
  );
}
