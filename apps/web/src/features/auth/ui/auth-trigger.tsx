"use client";

import { Button } from "@workspace/ui/button";

import { useAuthModal } from "../model/use-auth-modal";

interface AuthTriggerProps {
  mode?: "signin" | "signup";
  children?: React.ReactNode;
  variant?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost";
  size?: "sm" | "md" | "lg";
  redirectTo?: string;
}

export function AuthTrigger({
  mode = "signin",
  children,
  variant = "solid",
  size = "md",
  redirectTo,
}: AuthTriggerProps) {
  const { openSignIn, openSignUp } = useAuthModal();

  const handleClick = () => {
    if (mode === "signin") {
      openSignIn(redirectTo);
    } else {
      openSignUp(redirectTo);
    }
  };

  return (
    <Button color="primary" size={size} variant={variant} onClick={handleClick}>
      {children || (mode === "signin" ? "Sign In" : "Sign Up")}
    </Button>
  );
}
