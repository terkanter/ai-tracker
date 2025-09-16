import clsx from "clsx";
import { ReactNode } from "react";
import "./globals.css";

import { fontSans } from "./fonts";

type Props = {
  children: ReactNode;
  locale: string;
};

export default function Document({ children, locale }: Props) {
  return (
    <html suppressHydrationWarning lang={locale}>
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
