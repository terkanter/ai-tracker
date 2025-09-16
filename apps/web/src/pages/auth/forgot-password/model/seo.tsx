import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Forgot Password",
    description: "Reset your password to regain access to your account.",
    robots: {
      index: false,
      follow: false,
    },
  };
}
