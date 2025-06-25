import { getLocale, setLocale } from "optimized-next-intl/src/server/functions/server";
import KTextConstants from "./text_constants";

export async function setPageLocaleAsync(params: Promise<{ locale: Language }>): Promise<Language> {
    const { locale } = await params;
    if (KTextConstants.locales.includes(locale)) {
        return setPageLocale({ locale });
    } else {
        const cookieLocale = await getLocale() as Language;
        return setPageLocale({ locale: cookieLocale });
    }
}

export function setPageLocale(params: { locale: Language }): Language {
    const { locale } = params;
    try {
        setLocale(locale);
        return locale;
    } catch (e) {
        console.error(`Set Request Locale Error locale: ${locale}`, e);
        return locale;
    }
}