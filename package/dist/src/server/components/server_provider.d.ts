import type { TranslationObject } from "../../types/types";
export default function LocationzationProvider({ language, messages, children }: {
    language: string;
    messages?: TranslationObject;
    children: React.ReactNode;
}): Promise<Component>;
