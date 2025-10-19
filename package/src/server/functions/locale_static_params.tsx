import config from "../../config/intl_config";

export function getLocaleStaticParams(): { locale: string }[] {
  const locales = config.locales.map((locale) => ({ locale }));
  return locales;
}