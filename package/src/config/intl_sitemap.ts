import type { MetadataRoute } from 'next'
import { languages } from '../general/metadata';
import config from './intl_config';
import type { Alternates, IntlSitemap } from '../types/types';

function generateAlternates(url: string, link?: string): Alternates {
    return {
        languages: languages(url, link),
    };
}

export default function generateIntlSitemap({
    intlSitemap,
    url
}: {
    intlSitemap: IntlSitemap[],
    url: string,
}): MetadataRoute.Sitemap {
    const sitemap: MetadataRoute.Sitemap = [];
    for (const customRoute of intlSitemap) {
        const alternates = generateAlternates(url, customRoute.link);
        for (const locale of config.locales) {
            const localeValue = locale === config.defaultLocale ? !customRoute.link ? '/' : '' : `/${locale}`;

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