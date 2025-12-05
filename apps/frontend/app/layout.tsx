"use client";

import "@/app/globals.css";
import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/providers/query-provider";
import { AuthProvider } from "@/providers/auth-context";
import { ThemeProvider } from "@/providers/theme-provider";
import { LocaleProvider } from "@/providers/locale-context";
import { IntlProvider } from "@/providers/intl-provider";
import { OfflineStatusProvider } from "@/providers/offline-status-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
        className={cn(
          "flex min-h-screen w-full flex-col overflow-x-hidden bg-background font-sans text-foreground antialiased transition-colors",
        )}
        data-next-api-runtime="frontend"
        data-layout-version="2024-CSR"
      >
        <ThemeProvider>
          <LocaleProvider>
            <IntlProvider>
              <AuthProvider>
                <TooltipProvider>
                  <OfflineStatusProvider>
                    <QueryProvider>
                      <main className="flex-1 w-full">{children}</main>
                    </QueryProvider>
                  </OfflineStatusProvider>
                </TooltipProvider>
              </AuthProvider>
            </IntlProvider>
          </LocaleProvider>
        </ThemeProvider>
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
