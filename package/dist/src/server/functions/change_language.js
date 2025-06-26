"use server";
import { cookies } from "next/headers";
import { localeCookieName } from "../../config/middleware";
export default async function changeLagnuage(value) {
    try {
        (await cookies()).set(localeCookieName, value, {
            path: '/',
            maxAge: 60 * 60 * 24 * 365,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
    }
    catch (e) {
        console.error(`Set Language Cookie Error with value: ${value}`, e);
    }
}
