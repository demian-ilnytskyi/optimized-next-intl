import { getTranslationsImpl } from "../../general/general_functions";
import { getLocaleCache, getMessageCache } from "../../general/cache_variables";
export function useLocale() {
    const language = getLocaleCache();
    if (language === undefined) {
        throw new Error('Please set IntlProvider before using useLocale');
    }
    return language;
}
export function useTranslations(namespace) {
    const language = getLocaleCache();
    const messages = getMessageCache(language);
    if (!language || !messages) {
        throw new Error('Please set IntlProvider before using useTranslations');
    }
    return getTranslationsImpl(language, messages, namespace);
}
