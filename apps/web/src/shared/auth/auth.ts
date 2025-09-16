import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  plugins: [
    nextCookies(), // This should be the last plugin
  ],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  // Add other server-side configuration here
});
