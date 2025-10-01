import { Notification } from "@workspace/admin/notification";
import { TextInput } from "@workspace/admin/text-input";
import { Button } from "@workspace/ui/button";
import { Form, required, useLogin, useNotify } from "ra-core";
import { useState } from "react";
import type { FieldValues, SubmitHandler } from "react-hook-form";

export function LoginPage(props: { redirectTo?: string }) {
  const { redirectTo } = props;
  const [loading, setLoading] = useState(false);
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit: SubmitHandler<FieldValues> = (values) => {
    setLoading(true);
    login(values, redirectTo)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        notify(
          typeof error === "string"
            ? error
            : typeof error === "undefined" || !error.message
              ? "ra.auth.sign_in_error"
              : error.message,
          {
            type: "error",
            messageArgs: {
              _:
                typeof error === "string"
                  ? error
                  : error?.message
                    ? error.message
                    : undefined,
            },
          },
        );
      });
  };

  return (
    <div className="flex min-h-screen">
      <div className="relative container grid flex-col items-center justify-center sm:max-w-none lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
              <p className="text-muted-foreground text-sm leading-none">
                Try janedoe@acme.com / password
              </p>
            </div>
            <Form className="space-y-8" onSubmit={handleSubmit}>
              <TextInput
                label="Email"
                source="email"
                type="email"
                validate={required()}
              />
              <TextInput
                label="Password"
                source="password"
                type="password"
                validate={required()}
              />
              <Button
                className="cursor-pointer"
                disabled={loading}
                type="submit"
              >
                Sign in
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
}
