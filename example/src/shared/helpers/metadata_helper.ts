import type { Metadata } from "next";
import KTextConstants from "../constants/variables/text_constants";
import { TranslatorReturnType } from "optimized-next-intl/src/types/types";
import { alternatesLinks } from "optimized-next-intl/src/general/metadata";


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
}: MetadataHelperProps): Partial<Metadata> {
  return {
    title: isMain ? {
      default: t('title.default'),
      template: t('title.template'),
    } : t('title'),
    description: t('description'),
    alternates: alternatesLinks({ url: KTextConstants.baseUrl, locale, linkPart, canonical }),
  }
}