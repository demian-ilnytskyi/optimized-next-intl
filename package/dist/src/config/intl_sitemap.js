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
        const linkPart = customRoute.link == '/' ? undefined : customRoute.link;
        const alternates = generateAlternates(url, linkPart);
        for (const locale of config.locales) {
            const localeValue = locale === config.defaultLocale ? !linkPart ? '/' : '' : `/${locale}`;
            const localeUrl = url + localeValue;
            sitemap.push({
                ...customRoute,
                alternates: alternates,
                url: localeUrl + (linkPart ?? ''),
            });
        }
    }
    sitemap.sort((a, b) => a.url.localeCompare(b.url));
    return sitemap;
}
