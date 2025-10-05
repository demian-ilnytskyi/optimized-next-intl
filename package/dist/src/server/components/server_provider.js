import { jsx as _jsx } from "react/jsx-runtime";
import { setLocaleCache, setMessageForLocaleCache } from "../../general/cache_variables";
import { getMessage } from "../functions/server";
import dynamic from "next/dynamic";
const LocationzationClientProvider = dynamic(() => import("../../client/components/client_provider"));
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
