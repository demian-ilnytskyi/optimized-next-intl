
"use server";

import { cookies } from "next/headers";
import { localeCookieName, swiutchLocaleCookieName } from "../../config/cookie_key";

export default async function changeLagnuage(value: string): Promise<boolean> {
    try {
        const cookie = (await cookies());
        const locale = cookie.get(localeCookieName)?.value;
        if (locale !== value) {
            cookie.set(swiutchLocaleCookieName, value, {
                path: '/',
                maxAge: 60,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
            });
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.error(`Set Language Cookie Error with value: ${value}`, e);
        return false;
    }
}