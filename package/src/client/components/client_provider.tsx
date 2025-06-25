"use client";

import { createContext, useContext, useMemo } from "react";
import type { TranslatorReturnType, TranslationObject } from "../../server/functions/server";
import { getTranslationsImpl, setLocale } from "../../server/functions/server";

interface LocaleContextType {
    locale: string;
    messages: TranslationObject;
    //   toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export default function LocationzationClientProvider({ locale, messages, children }: { locale: string, messages: TranslationObject, children: React.ReactNode }): Component {
    setLocale(locale);
    return <LocaleContext.Provider value={{ locale, messages }}>
        {children}
    </LocaleContext.Provider>;
}

export function useLocale(): string {
    const context = useContext(LocaleContext);
    if (context === undefined) {
        throw new Error('useLocale must be used within a LocaleContext');
    }
    return context.locale;
}

export function useTranslations(namespace: string): TranslatorReturnType {
    const context = useContext(LocaleContext);
    if (context === undefined) {
        throw new Error('useTranslations must be used within a LocaleContext');
    }

    const { locale, messages } = context;

    return useMemo(
        () => getTranslationsImpl(locale, messages, namespace),
        [locale, messages, namespace]
    );
}