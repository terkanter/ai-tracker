"use client";

import { HeroSection } from "./hero-section";

import { AuthTrigger } from "@/features/auth/ui/auth-trigger";

const heroData = {
  cta: {
    text: "Get started by editing",
    href: "app/page.tsx",
  },
};

export function IndexPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 container mx-auto">
      <HeroSection {...heroData} />
      <AuthTrigger />
    </div>
  );
}
