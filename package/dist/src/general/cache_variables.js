// Caches for loaded translation objects and memoized translation functions.
const loadedTranslations = new Map();
const translationFunctionsCache = new Map();
let currentLanguage = undefined; // Renamed 'language' to 'currentLanguage' for clarity
/**
 * Sets the current locale.
 * @param locale The language to set.
 */
export function setLocaleCache(locale) {
    if (typeof locale === 'string') {
        currentLanguage = locale;
    }
    else {
        currentLanguage = locale.locale;
    }
}
export async function setLocaleAsync(params) {
    const { locale } = await params;
    currentLanguage = locale;
}
export function getLocaleCache() {
    return currentLanguage;
}
export function setMessageForLocaleCache(locale, message) {
    loadedTranslations.set(locale, message);
}
export function getMessageForLocaleCache(locale) {
    if (loadedTranslations.has(locale)) {
        return loadedTranslations.get(locale);
    }
    else {
        return undefined;
    }
}
export function setTranslationCache(cache, value) {
    translationFunctionsCache.set(cache, value);
}
export function getLocaleClient() {
    if (currentLanguage) {
        return currentLanguage;
    }
    else {
        throw Error('you can use useLocale only with LocationzationProvider');
    }
}
export function getMessagesClient() {
    const value = currentLanguage ? loadedTranslations.get(currentLanguage) : undefined;
    if (value) {
        return value;
    }
    else {
        throw Error('you can use useTranslations only with LocationzationProvider');
    }
}
