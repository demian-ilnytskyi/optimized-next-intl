import type { Metadata } from "next";
import KTextConstants from "../constants/variables/text_constants";
import { TranslatorReturnType } from "optimized-next-intl/src/server/functions/server";

export function languages(link: string, linkPart?: string): Record<string, string> {
  try {
    return KTextConstants.locales.reduce(
      (acc: Record<string, string>, locale: Language) => {
        const localeValue = locale === KTextConstants.defaultLocale ? '' : `/${locale}`;
        acc[locale] = link + localeValue + (linkPart ?? '');
        return acc;
      },
      { 'x-default': link + (linkPart ?? '') }
    );
  } catch (e) {
    console.error(`Language Helper error for Metadata, link: ${link}, linkPart: ${linkPart}`, e);
    return {};
  }
}

interface MetadataHelperProps {
  t: TranslatorReturnType;
  locale: Language;
  isMain?: boolean;
  canonical?: string
  linkPart: string;
  setCanonical?: boolean;
}

export default function metadataHelper({
  t,
  isMain = false,
  linkPart,
  locale,
  canonical,
  setCanonical = true,
}: MetadataHelperProps): Partial<Metadata> {
  return {
    title: isMain ? {
      default: t('title.default'),
      template: t('title.template'),
    } : t('title'),
    description: t('description'),
    alternates: {
      canonical: locale === KTextConstants.defaultLocale && setCanonical ? KTextConstants.baseUrl + linkPart : canonical,
      languages: languages(KTextConstants.baseUrl, linkPart),
    }
  }
}