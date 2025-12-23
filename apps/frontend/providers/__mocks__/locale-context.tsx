export const LocaleProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const useLocale = () => ({
  locale: "en" as const,
  setLocale: () => {},
});
