import { languages } from '../general/metadata';
import config from './intl_config';
import { cache } from 'react';
function generateAlternates(url, link) {
    return {
        languages: languages(url, link),
    };
}
function generateIntlSitemapIml({ intlSitemap, url }) {
    const sitemap = [];
    for (const customRoute of intlSitemap) {
        const linkPart = customRoute.link == '/' ? undefined : customRoute.link;
        const alternates = generateAlternates(url, linkPart);
        for (const locale of config.locales) {
            const localeValue = locale === config.defaultLocale ? '' : `/${locale}`;
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
const generateIntlSitemap = cache(generateIntlSitemapIml);
export default generateIntlSitemap;
