
"use server";

import { cookies } from "next/headers";
import { localeCookieName } from "../../config/cookie_key";
import config from "../../config/intl_config";

export default async function changeLagnuage(value: string, componentIsSWitcher?: boolean): Promise<string> {
    try {
        const cookie = (await cookies());
        const locale = cookie.get(localeCookieName)?.value;
        let localeValue: string;
        if (locale === value && componentIsSWitcher === true) {
            if (locale === config.defaultLocale) {
                localeValue = config.locales.find(
                    (locale) =>
                        locale !== config.defaultLocale
                ) ?? config.defaultLocale;
            } else {
                localeValue = config.defaultLocale;
            }
        } else {
            localeValue = value;
        }
        cookie.set(localeCookieName, localeValue, {
            path: '/',
            maxAge: 60 * 60 * 24 * 365,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
        return localeValue;
    } catch (e) {
        console.error(`Set Language Cookie Error with value: ${value}`, e);
        return value;
    }
}