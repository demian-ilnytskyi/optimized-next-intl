"use client";

import type { TranslationObject } from "../../types/types";
import { setLocaleCache, setMessageForLocaleCache } from "../../general/cache_variables";
import { createContext } from "react";

interface LocaleContextType {
    language: string;
    messages: TranslationObject;
    //   toggleLocale: () => void;
}

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export default function LocationzationClientProvider({ language, messages, children }: { language: string, messages: TranslationObject, children: React.ReactNode }): Component {
    setLocaleCache(language);
    setMessageForLocaleCache(language, messages);

    return <LocaleContext.Provider value={{ language, messages }}>
        {children}
    </LocaleContext.Provider>;
}