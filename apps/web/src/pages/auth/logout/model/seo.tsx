import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Logout",
    description: "You are being signed out of your account.",
    robots: {
      index: false,
      follow: false,
    },
  };
}
