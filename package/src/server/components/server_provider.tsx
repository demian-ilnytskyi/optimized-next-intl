import { setLocaleCache, setMessageForLocaleCache } from "../../general/cache_variables";
import LocationzationClientProvider from "../../client/components/client_provider";
import { getMessage } from "../functions/server";
import type { TranslationObject } from "../../types/types";

export default async function LocationzationProvider({ language, messages, children }: { language: string, messages?: TranslationObject, children: React.ReactNode }): Promise<Component> {
    if (language) {
        setLocaleCache(language);
    }
    if (messages) {
        setMessageForLocaleCache(language, messages);
    }
    const messagesValue = messages ?? await getMessage(language);

    return <LocationzationClientProvider language={language} messages={messagesValue}>
        {children}
    </LocationzationClientProvider>
}