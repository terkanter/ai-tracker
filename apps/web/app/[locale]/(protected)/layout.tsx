import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/shared/auth/auth";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/sign-in");
  }

  return <div>{children}</div>;
}
