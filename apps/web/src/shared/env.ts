import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `PUBLIC_`.
   */
  client: {
    VITE_API_URL: z.string().url().default("http://localhost:3000"),
  },

  /**
   * Client prefix for Vite
   */
  clientPrefix: "VITE_",

  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   * For Vite, we use `import.meta.env` instead of `process.env`
   */
  runtimeEnv: {
    VITE_API_URL: import.meta.env.VITE_API_URL,
  },

  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a URL, you'll get a type error.
   *
   * If you want to skip validation for one reason or another, you can
   * use the `skipValidation` option.
   *
   * This is especially useful for Docker builds, where you don't want to
   * validate the environment variables at build time, but rather at runtime.
   */
  skipValidation: !!import.meta.env.SKIP_ENV_VALIDATION,

  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});

export const appConfig = {
  api: {
    url: env.VITE_API_URL,
  },
} as const;
