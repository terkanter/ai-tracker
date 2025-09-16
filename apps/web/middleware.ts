import createMiddleware from "next-intl/middleware";

import { routing } from "@/shared/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next`, `/admin` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  // - … static files and assets
  matcher: [
    "/((?!api|sitemap|robots|favicon|next|preview|trpc|_next|_vercel|admin|.*\\..*).*)",
    // Include root path for locale detection
    "/",
  ],
};
