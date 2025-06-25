import LocationzationClientProvider from "../../client/components/client_provider";
import { getLocale, loadMessagesForLocale, type TranslationObject } from "../functions/server";

export default async function LocationzationProvider({ locale, messages, children }: { locale?: string, messages?: TranslationObject, children: React.ReactNode }): Promise<Component> {
    const language = locale ?? await getLocale();
    const messagesValue = messages ?? await loadMessagesForLocale(language);

    return <LocationzationClientProvider locale={language} messages={messagesValue}>
        {children}
    </LocationzationClientProvider>
}