"use server";
import { cookies } from "next/headers";
import { localeCookieName, isDarkCookieKey } from "../../config/cookie_key";
import config from "../../config/intl_config";
export default async function getCurrentTheme() {
    const cookie = await cookies();
    const isDarkMode = cookie.get(isDarkCookieKey)?.value;
    const isDark = getCookieBooleanValue(isDarkMode);
    const locale = cookie.get(localeCookieName)?.value ?? config.defaultLocale;
    const htmlParam = { suppressHydrationWarning: !isDarkMode, lang: locale };
    if (isDark === true) {
        htmlParam.className = 'dark';
    }
    return { isDark, locale, htmlParam };
}
function getCookieBooleanValue(cookieValue) {
    switch (cookieValue) {
        case "true":
            return true;
        case "false":
            return false;
        default:
            return null;
    }
}
