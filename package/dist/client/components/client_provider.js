"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { setLocaleCache, setMessageForLocaleCache } from "../../general/cache_variables";
import { createContext } from "react";
export const LocaleContext = createContext(undefined);
export default function LocationzationClientProvider({ language, messages, children }) {
    setLocaleCache(language);
    setMessageForLocaleCache(language, messages);
    return _jsx(LocaleContext.Provider, { value: { language, messages }, children: children });
}
