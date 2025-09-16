import { HeroUIProvider, HeroUIProviderProps } from "@heroui/react";
import { ThemeProvider, ThemeProviderProps } from "next-themes";
import React from "react";

interface ProvidersProps extends Omit<HeroUIProviderProps, "children"> {
  children: React.ReactNode;
  themeProviderProps?: ThemeProviderProps;
}

export function Providers({
  children,
  themeProviderProps,
  ...props
}: ProvidersProps) {
  return (
    <HeroUIProvider {...props}>
      <ThemeProvider
        disableTransitionOnChange
        enableSystem
        attribute="class"
        defaultTheme="system"
        {...themeProviderProps}
      >
        {children}
      </ThemeProvider>
    </HeroUIProvider>
  );
}
