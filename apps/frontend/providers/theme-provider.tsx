"use client";

import { PropsWithChildren } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="impactbridge-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
