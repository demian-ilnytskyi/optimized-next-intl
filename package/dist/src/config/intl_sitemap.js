import { languages } from '../general/metadata';
import config from './intl_config';
function generateAlternates(url, link) {
    return {
        languages: languages(url, link),
    };
}
export default function generateIntlSitemap({ intlSitemap, url }) {
    const sitemap = [];
    for (const customRoute of intlSitemap) {
        const alternates = generateAlternates(url, customRoute.link);
        for (const locale of config.locales) {
            const localeValue = locale === config.defaultLocale ? '' : `/${locale}`;
            const localeUrl = url + localeValue;
            sitemap.push({
                ...customRoute,
                alternates: alternates,
                url: localeUrl + (customRoute.link ?? ''),
            });
        }
    }
    sitemap.sort((a, b) => a.url.localeCompare(b.url));
    return sitemap;
}
