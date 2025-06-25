"use client";

import type { TranslationObject, TranslatorReturnType } from "../../types/types";
import { setLocaleCache, setMessageForLocaleCache } from "../../general/cache_variables";
import { createContext, useContext, useMemo } from "react";
import { getTranslationsImpl } from "../../general/general_functions";

interface LocaleContextType {
    language: string;
    messages: TranslationObject;
    //   toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export default function LocationzationClientProvider({ language, messages, children }: { language: string, messages: TranslationObject, children: React.ReactNode }): Component {
    setLocaleCache(language);
    setMessageForLocaleCache(language, messages);

    return <LocaleContext.Provider value={{ language, messages }}>
        {children}
    </LocaleContext.Provider>;
}

export function useLocale(): string {
    const context = useContext(LocaleContext);
    if (context === undefined) {
        throw new Error('useLocale must be used within a LocaleContext');
    }
    return context.language;
}

export function useTranslations(namespace: string): TranslatorReturnType {
    const context = useContext(LocaleContext);
    if (context === undefined) {
        throw new Error('useTranslations must be used within a LocaleContext');
    }

    const { language, messages } = context;

    return useMemo(
        () => getTranslationsImpl(language, messages, namespace),
        [language, messages, namespace]
    );
}