import type { TranslationObject, TranslatorReturnType } from "../../types/types";
export default function LocationzationClientProvider({ language, messages, children }: {
    language: string;
    messages: TranslationObject;
    children: React.ReactNode;
}): Component;
export declare function useLocale(): string;
export declare function useTranslations(namespace: string): TranslatorReturnType;
