import type { MetadataRoute } from 'next';
import type { IntlSitemap } from '../types/types';
export default function generateIntlSitemap({ intlSitemap, url }: {
    intlSitemap: IntlSitemap[];
    url: string;
}): MetadataRoute.Sitemap;
