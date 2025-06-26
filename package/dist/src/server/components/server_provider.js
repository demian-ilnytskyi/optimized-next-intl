import { jsx as _jsx } from "react/jsx-runtime";
import { setLocaleCache, setMessageForLocaleCache } from "../../general/cache_variables";
import LocationzationClientProvider from "../../client/components/client_provider";
import { getMessage } from "../functions/server";
export default async function LocationzationProvider({ language, messages, children }) {
    if (language) {
        setLocaleCache(language);
    }
    if (messages) {
        setMessageForLocaleCache(language, messages);
    }
    const messagesValue = messages ?? await getMessage(language);
    return _jsx(LocationzationClientProvider, { language: language, messages: messagesValue, children: children });
}
