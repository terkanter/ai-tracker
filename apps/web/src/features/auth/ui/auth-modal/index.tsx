import dynamic from "next/dynamic";

import { useSession } from "@/shared/auth/use-session";

const AuthModal = dynamic(
  () => import("./ui/auth-modal").then((mod) => mod.AuthModal),
  {
    ssr: false,
  }
);

export const AuthModalAsync = () => {
  const session = useSession();

  if (session.data) {
    return null;
  }

  return <AuthModal />;
};
