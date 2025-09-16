import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sign Up",
    description:
      "Create a new account to start reading and managing your comic collection.",
    robots: {
      index: false,
      follow: false,
    },
  };
}
