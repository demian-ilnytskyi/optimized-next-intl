import config from "../../config/intl_config";
import { localesSet } from "../../config/middleware";

// Helper function to determine the best matching locale from the Accept-Language header
export default function languageDetecotr(
    acceptLanguageHeader: string | null,
): string {
    try {
        if (!acceptLanguageHeader) {
            return config.defaultLocale;
        }

        // Parse the Accept-Language header, e.g., "en-US,en;q=0.9,es;q=0.8"
        // Key difference: parse q-value immediately and sort by it
        const parsedLocales = acceptLanguageHeader
            .split(',');
        let localeValue: { locale: string, q: number } | undefined;

        for (const item of parsedLocales) {
            const parts = item.trim().split(';');
            const locale = parts[0];
            const languageOnly = locale.split('-')[0];
            if (languageOnly) {
                const q = parts.length > 1 ? parseFloat(parts[1].split('=')[1]) : 1;
                if (!localeValue || localeValue.q < q && localesSet.has(languageOnly)) {
                    localeValue = { locale: languageOnly, q };
                }
            }
        }

        // If none of the languages in the Accept-Language header are supported, return the default locale
        return localeValue?.locale ?? config.defaultLocale;
    } catch (e) {
        console.error(`Language Detect Error: acceptLanguageHeader: ${acceptLanguageHeader}`, e);
        return config.defaultLocale;
    }
}