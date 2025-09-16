import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sign In",
    description:
      "Sign in to your account to access your dashboard and manage your comics.",
    robots: {
      index: false,
      follow: false,
    },
  };
}
