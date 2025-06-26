"use client";

import { useContext, useMemo } from "react";
import { LocaleContext } from "../components/client_provider";
import { TranslatorReturnType } from "../../types/types";
import { getTranslationsImpl } from "../../general/general_functions";


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