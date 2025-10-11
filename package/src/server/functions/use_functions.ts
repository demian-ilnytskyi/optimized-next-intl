import type { TranslatorReturnType } from "../../types/types";
import { getTranslationsImpl } from "../../general/general_functions";
import { getLocale, getMessage } from "./server";
import { use } from "react";

export function useLocale(): string {
    const language = use(getLocale());
    if (language === undefined) {
        throw new Error('Please set IntlProvider before using useLocale');
    }
    return language;
}

export function useTranslations(namespace: string): TranslatorReturnType {
    const language = use(getLocale());
    const messages = use(getMessage(language));

    if (!language || !messages) {
        throw new Error('Please set IntlProvider before using useTranslations');
    }

    return getTranslationsImpl(language, messages, namespace);
}