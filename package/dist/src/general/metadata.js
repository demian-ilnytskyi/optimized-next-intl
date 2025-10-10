import config from "../config/intl_config";
export function alternatesLinks({ locale, url, canonical, linkPart }) {
    try {
        const linkPartValue = linkPart == '/' ? undefined : linkPart;
        return {
            canonical: canonical ?? (locale === config.defaultLocale ? `${url}${linkPartValue ?? '/'}` : undefined),
            languages: languages(url, linkPartValue),
        };
    }
    catch (e) {
        console.error(`Language Helper error for Metadata, link: ${url}, linkPart: ${linkPart}`, e);
        return undefined;
    }
}
export function languages(url, linkPart) {
    return config.locales.reduce((acc, locale) => {
        const localeValue = locale === config.defaultLocale ? (!linkPart ? '/' : '') : `/${locale}`;
        acc[locale] = url + localeValue + (linkPart ?? '');
        return acc;
    }, { 'x-default': url + (linkPart ?? '/') });
}
