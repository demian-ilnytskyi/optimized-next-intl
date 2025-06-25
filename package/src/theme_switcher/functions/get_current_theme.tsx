"use server";

import { cookies } from "next/headers";
import { isDarkCookieKey } from "./deletect_theme_script";
import { localeCookieName } from "../../config/middleware";
import config from "../../config/intl_config";

export default async function getCurrentTheme(): Promise<{ isDark: boolean | null, locale: string, htmlClass?: { className: string } }> {
    const cookie = await cookies();
    const isDarkMode = cookie.get(isDarkCookieKey)?.value;
    const isDark = getCookieBooleanValue(isDarkMode);
    const locale = (cookie.get(localeCookieName)?.value as Language) ?? config.defaultLocale;
    const htmlClass = isDark === true ? { className: 'dark' } : undefined;
    return { isDark, locale, htmlClass };
}

function getCookieBooleanValue(cookieValue: string | undefined): boolean | null {
    switch (cookieValue) {
        case "true":
            return true;
        case "false":
            return false;
        default:
            return null;
    }
}