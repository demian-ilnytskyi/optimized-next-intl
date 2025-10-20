import config from "../../config/intl_config";
export const getLocaleStaticParams = config.locales.map((locale) => ({ locale }));
