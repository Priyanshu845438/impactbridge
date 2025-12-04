"use client";

import { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";
import { Locale, defaultLocale } from "@/i18n";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({ children, initialLocale = defaultLocale }: PropsWithChildren<{ initialLocale?: Locale }>) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
