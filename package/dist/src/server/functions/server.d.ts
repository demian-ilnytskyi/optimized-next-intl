import type { TranslationObject, TranslatorReturnType } from "../../types/types";
/**
 * Loads and caches messages for a specific locale using dynamic import.
 * Prevents redundant file loads and handles import errors gracefully.
 * @param locale The locale for which to load messages.
 * @returns A promise that resolves to the TranslationObject for the given locale.
 */
export declare function getMessage(locale: string): Promise<TranslationObject>;
/**
 * Retrieves a translation function for a specific namespace and locale.
 * This function handles caching of both translation files and memoized translation functions.
 * @param namespace The dot-separated namespace (e.g., "common.buttons").
 * @param locale Optional: The specific locale to use. If not provided, it will be determined.
 * @returns A promise that resolves to a function, which takes a key and returns the translated string.
 */
export declare function getTranslations(namespace: string, locale?: string): Promise<TranslatorReturnType>;
/**
 * Determines the current locale. It first checks for an explicitly set locale,
 * and finally reads from cookies.
 * @returns A promise that resolves to the determined Language.
 */
export declare function getLocale(): Promise<string>;
