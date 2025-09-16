import { SignInForm } from "@/features/auth";

export function SignInPage() {
  return (
    <div className="flex flex-1 h-full items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <SignInForm />
    </div>
  );
}
