"use server";

import { cookies } from "next/headers";
import { localeCookieName, isDarkCookieKey } from "../../config/cookie_key";
import config from "../../config/intl_config";

interface HtmlParamProps {
    className?: string;
    suppressHydrationWarning?: boolean;
    lang: string;
}

export default async function getCurrentTheme(): Promise<{ isDark: boolean | null, locale: string, htmlParam?: HtmlParamProps }> {
    const cookie = await cookies();
    const isDarkMode = cookie.get(isDarkCookieKey)?.value;
    const isDark = getCookieBooleanValue(isDarkMode);
    const locale = (cookie.get(localeCookieName)?.value as string) ?? config.defaultLocale;
    const htmlParam: HtmlParamProps = { suppressHydrationWarning: !isDarkMode, lang: locale };
    if (isDark === true) {
        htmlParam.className = 'dark';
    }
    return { isDark, locale, htmlParam };
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