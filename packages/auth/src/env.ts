import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const authEnv = createEnv({
  client: {
    VITE_API_URL: z.string().url().default("http://localhost:3000"),
  },

  clientPrefix: "VITE_",

  runtimeEnv: {
    VITE_API_URL: import.meta.env.VITE_API_URL,
  },

  skipValidation: !!import.meta.env.SKIP_ENV_VALIDATION,

  emptyStringAsUndefined: true,
});
