"use client";

import { PropsWithChildren, useMemo } from "react";
import { NextIntlClientProvider } from "next-intl";

import { Locale, defaultLocale } from "@/i18n";
import en from "@/i18n/en.json";
import hi from "@/i18n/hi.json";
import { useLocale } from "@/providers/locale-context";

const messageMap: Record<Locale, Record<string, string>> = {
  en,
  hi,
};

interface IntlProviderProps {
  locale?: Locale;
}

export function IntlProvider({ locale = defaultLocale, children }: PropsWithChildren<IntlProviderProps>) {
  const { locale: currentLocale } = useLocale();
  const activeLocale = currentLocale ?? locale;
  const messages = useMemo(() => messageMap[activeLocale] ?? messageMap[defaultLocale], [activeLocale]);

  return (
    <NextIntlClientProvider locale={activeLocale} messages={messages} timeZone="Asia/Kolkata">
      {children}
    </NextIntlClientProvider>
  );
}
