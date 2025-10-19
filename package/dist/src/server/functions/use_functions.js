import { getTranslationsImpl } from "../../general/general_functions";
import { getLocale, getMessage } from "./server";
import { cache, use } from "react";
const isDev = process.env.NODE_ENV === 'development';
export function useLocaleImpl() {
    const language = use(getLocale());
    if (language === undefined) {
        throw new Error('Please set IntlProvider before using useLocale');
    }
    return language;
}
export const useLocale = isDev ? useLocaleImpl : cache(useLocaleImpl);
function useTranslationsImpl(namespace) {
    const language = use(getLocale());
    const messages = use(getMessage(language));
    if (!language || !messages) {
        throw new Error('Please set IntlProvider before using useTranslations');
    }
    return getTranslationsImpl(language, messages, namespace);
}
export const useTranslations = isDev ? useTranslationsImpl : cache(useTranslationsImpl);
