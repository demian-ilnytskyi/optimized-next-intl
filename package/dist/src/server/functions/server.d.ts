import type { TranslationObject, TranslatorReturnType } from "../../types/types";
/**
 * Loads and caches messages for a specific locale using dynamic import.
 * Prevents redundant file loads and handles import errors gracefully.
 * @param locale The locale for which to load messages.
 * @returns A promise that resolves to the TranslationObject for the given locale.
 */
declare function iGetMessage(locale: string): Promise<TranslationObject>;
export declare const getMessage: typeof iGetMessage;
/**
 * Retrieves a translation function for a specific namespace and locale.
 * This function handles caching of both translation files and memoized translation functions.
 * @param namespace The dot-separated namespace (e.g., "common.buttons").
 * @param locale Optional: The specific locale to use. If not provided, it will be determined.
 * @returns A promise that resolves to a function, which takes a key and returns the translated string.
 */
declare function iGetTranslations(namespace: string, locale?: string): Promise<TranslatorReturnType>;
export declare const getTranslations: typeof iGetTranslations;
/**
 * Determines the current locale. It first checks for an explicitly set locale,
 * and finally reads from cookies.
 * @returns A promise that resolves to the determined Language.
 */
declare function iGetLocale(): Promise<string>;
export declare const getLocale: typeof iGetLocale;
export {};
