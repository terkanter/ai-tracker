import { betterAuth } from "better-auth";
import { authEnv } from "../env";

export const auth = betterAuth({
  baseURL: authEnv.VITE_API_URL,
  plugins: [
    // nextCookies(), // This should be the last plugin
  ],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  // Add other server-side configuration here
});
