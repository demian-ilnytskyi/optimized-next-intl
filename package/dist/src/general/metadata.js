import { cache } from "react";
import config from "../config/intl_config";
export function iAlternatesLinks({ locale, url, canonical, linkPart }) {
    try {
        const linkPartValue = linkPart == '/' ? undefined : linkPart;
        return {
            canonical: canonical ?? (locale === config.defaultLocale ? `${url}${linkPartValue ?? ''}` : undefined),
            languages: languages(url, linkPartValue),
        };
    }
    catch (e) {
        console.error(`Language Helper error for Metadata, link: ${url}, linkPart: ${linkPart}, Error: ${e}`);
        return undefined;
    }
}
export const alternatesLinks = cache(iAlternatesLinks);
function iLanguages(url, linkPart) {
    return config.locales.reduce((acc, locale) => {
        const localeValue = locale === config.defaultLocale ? '' : `/${locale}`;
        acc[locale] = url + localeValue + (linkPart ?? '');
        return acc;
    }, { 'x-default': url + (linkPart ?? '') });
}
export const languages = cache(iLanguages);
