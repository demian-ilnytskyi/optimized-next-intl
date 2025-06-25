import type { TranslationObject, TranslatorReturnType } from "@/types/types";

// Caches for loaded translation objects and memoized translation functions.
const loadedTranslations = new Map<string, TranslationObject>();
const translationFunctionsCache = new Map<string, TranslatorReturnType>();
let currentLanguage: string | undefined = undefined; // Renamed 'language' to 'currentLanguage' for clarity

/**
 * Sets the current locale.
 * @param locale The language to set.
 */
export function setLocaleCache(locale: string): void {
    currentLanguage = locale;
}

export function getLocaleCache(): string | undefined {
    return currentLanguage;
}

export function setMessageForLocaleCache(locale: string, message: TranslationObject): void {
    loadedTranslations.set(locale, message);
}

export function getMessageForLocaleCache(locale: string): TranslationObject | undefined {
    if (loadedTranslations.has(locale)) {
        return loadedTranslations.get(locale);
    } else {
        return undefined
    }
}

export function setTranslationCache(cache: string, value: TranslatorReturnType): void {
    translationFunctionsCache.set(cache, value);
}

export function getLocaleClient(): string {
    if (currentLanguage) {
        return currentLanguage;
    } else {
        throw Error('you can use useLocale only with LocationzationProvider')
    }
}

export function getMessagesClient(): TranslationObject {
    const value = currentLanguage ? loadedTranslations.get(currentLanguage) : undefined;
    if (value) {
        return value;
    } else {
        throw Error('you can use useTranslations only with LocationzationProvider')
    }
}