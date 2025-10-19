import config from "../../config/intl_config";
export function getLocaleStaticParams() {
    const locales = config.locales.map((locale) => ({ locale }));
    return locales;
}
