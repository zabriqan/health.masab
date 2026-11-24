"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import en from "../../messages/en.json";
import ar from "../../messages/ar.json";

type Messages = Omit<typeof en, "direction"> & { direction: "ltr" | "rtl" };
const dictionaries: Record<"en" | "ar", Messages> = {
  en: en as Messages,
  ar: ar as Messages,
};
export type Locale = keyof typeof dictionaries;
type I18nValue = { locale: Locale; setLocale: (locale: Locale) => void; messages: Messages; direction: "ltr" | "rtl"; localeOptions: { code: Locale; name: string }[]; t: (key: string) => string };

const I18nContext = createContext<I18nValue | null>(null);

function readPath(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((value, part) => {
    if (Array.isArray(value)) return value[Number(part)];
    if (value && typeof value === "object") return (value as Record<string, unknown>)[part];
    return undefined;
  }, source);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const firstSegment = pathname.split("/")[1];
  const locale: Locale = firstSegment === "ar" ? "ar" : "en";
  const setLocale = useCallback((nextLocale: Locale) => {
    if (nextLocale === locale) return;
    const restOfPath = pathname.slice(locale.length + 1);
    router.push(`/${nextLocale}${restOfPath}${window.location.hash}`);
  }, [locale, pathname, router]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dictionaries[locale].direction;
    document.body.dataset.locale = locale;
  }, [locale]);

  const value = useMemo<I18nValue>(() => {
    const messages = dictionaries[locale];
    const localeOptions = (Object.entries(dictionaries) as [Locale, Messages][]).map(([code, dictionary]) => ({ code, name: dictionary.languageName }));
    return {
      locale,
      setLocale,
      messages,
      direction: messages.direction,
      localeOptions,
      t: (key) => {
        const result = readPath(messages, key);
        return typeof result === "string" ? result : key;
      },
    };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside I18nProvider");
  return value;
}
