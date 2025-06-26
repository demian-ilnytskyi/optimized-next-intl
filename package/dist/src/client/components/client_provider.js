"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { setLocaleCache, setMessageForLocaleCache } from "../../general/cache_variables";
import { createContext, useContext, useMemo } from "react";
import { getTranslationsImpl } from "../../general/general_functions";
const LocaleContext = createContext(undefined);
export default function LocationzationClientProvider({ language, messages, children }) {
    setLocaleCache(language);
    setMessageForLocaleCache(language, messages);
    return _jsx(LocaleContext.Provider, { value: { language, messages }, children: children });
}
export function useLocale() {
    const context = useContext(LocaleContext);
    if (context === undefined) {
        throw new Error('useLocale must be used within a LocaleContext');
    }
    return context.language;
}
export function useTranslations(namespace) {
    const context = useContext(LocaleContext);
    if (context === undefined) {
        throw new Error('useTranslations must be used within a LocaleContext');
    }
    const { language, messages } = context;
    return useMemo(() => getTranslationsImpl(language, messages, namespace), [language, messages, namespace]);
}
