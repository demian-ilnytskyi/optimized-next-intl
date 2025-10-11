import type { TranslationObject } from "../../types/types";
interface LocaleContextType {
    language: string;
    messages: TranslationObject;
}
export declare const LocaleContext: import("react").Context<LocaleContextType | undefined>;
export default function LocationzationClientProvider({ language, messages, children }: {
    language: string;
    messages: TranslationObject;
    children: React.ReactNode;
}): Component;
export {};
