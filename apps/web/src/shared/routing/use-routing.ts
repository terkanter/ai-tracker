import { useAppRouting } from "./hooks/use-app-routing";
import { useAuthRouting } from "./hooks/use-auth-routing";
import { useContentRouting } from "./hooks/use-content-routing";

import { useRouter } from "@/shared/i18n/navigation";

interface UseRoutingReturn {
  // Basic router methods
  push: (path: string) => void;
  replace: (path: string) => void;
  back: () => void;
  forward: () => void;
  refresh: () => void;
  prefetch: (path: string) => void;

  // Namespace routing
  auth: ReturnType<typeof useAuthRouting>;
  app: ReturnType<typeof useAppRouting>;
  content: ReturnType<typeof useContentRouting>;
}

export function useRouting(): UseRoutingReturn {
  const router = useRouter();
  const authRouting = useAuthRouting();
  const appRouting = useAppRouting();
  const contentRouting = useContentRouting();

  return {
    // Basic router methods
    push: router.push,
    replace: router.replace,
    back: router.back,
    forward: router.forward,
    refresh: router.refresh,
    prefetch: router.prefetch,

    // Namespace routing
    auth: authRouting,
    app: appRouting,
    content: contentRouting,
  };
}
