import {
  inferAdditionalFields,
  usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { authEnv } from "../env";

export const authClient = createAuthClient({
  baseURL: authEnv.VITE_API_URL,
  plugins: [
    usernameClient(),
    inferAdditionalFields({
      user: {
        role: {
          type: "string",
        },
      },
    }),
    // inferAdditionalFields<typeof auth>()],

    // Add other client plugins here as needed
  ],
});
