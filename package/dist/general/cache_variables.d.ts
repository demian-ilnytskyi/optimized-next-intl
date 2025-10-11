import type { TranslationObject, TranslatorReturnType } from "../types/types";
/**
 * Sets the current locale.
 * @param locale The language to set.
 */
export declare function setLocaleCache(locale: string): void;
export declare function setLocaleAsync(params: Promise<{
    locale: string;
}>): Promise<void>;
export declare function getLocaleCache(): string | undefined;
export declare function setMessageForLocaleCache(locale: string, message: TranslationObject): void;
export declare function getMessageCache(locale?: string): TranslationObject | undefined;
export declare function setTranslationCache(cache: string, value: TranslatorReturnType): void;
