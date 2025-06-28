import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import getMatchingLocaleFromAcceptLanguage from '../server/functions/get_user_locale';
import type { CookieAttributes } from '../types/types';
import config from './intl_config';
import { isBotCookieKey, localeCookieName, swiutchLocaleCookieName } from './cookie_key';

const sameSite: true | false | "lax" | "strict" | "none" | undefined = 'lax';

const defaultCookieOption: CookieAttributes = {
    path: '/', // Cookie is valid for the entire domain
    maxAge: 2592000, // Store cookie for 30 days (in seconds).
    httpOnly: true, // Recommended for security (prevents client-side script access)
    secure: process.env.NODE_ENV === 'production', // Send cookie only over HTTPS in production
    sameSite: sameSite, // Protection against CSRF attacks. 'strict' or 'lax' are good choices.
};

async function getIsBotValue(userAgent: string | null): Promise<boolean> {
    if (userAgent === null) return false;
    const { isBot } = await import('next/dist/server/web/spec-extension/user-agent');
    return isBot(userAgent ?? '');
}

export const localesSet = new Set(config.locales);

// This middleware function runs for every incoming request
export default async function intlMiddleware(request: NextRequest): Promise<NextResponse<unknown>> {
    try {
        let initialChosenLocale: string;
        const existingLocaleCookie = request.cookies.get(localeCookieName)?.value;
        const switcherLocaleCookie = request.cookies.get(swiutchLocaleCookieName)?.value;

        let isSEOBot: boolean | undefined = undefined;

        // 1. The most performant step: Check if a locale cookie is already set
        // Also, verify if the value from this cookie is actually supported
        if (existingLocaleCookie && localesSet.has(existingLocaleCookie)) {
            initialChosenLocale = switcherLocaleCookie ?? existingLocaleCookie;
        } else {
            const userAgent = request.headers.get('user-agent');
            isSEOBot = await getIsBotValue(userAgent);
            initialChosenLocale = isSEOBot ? config.defaultLocale : getMatchingLocaleFromAcceptLanguage(
                request.headers.get('accept-language'),
            );
        }

        const { pathname, search, hash } = request.nextUrl;

        let urlLocale: string | undefined;
        let pathWithoutLocale: string;

        const pathSegments = pathname.split('/').filter(Boolean); // e.g., ['', 'en', 'about'] -> ['en', 'about']
        const firstSegment = pathSegments[0];
        const languageValue = firstSegment;

        // Check if the first segment of the path is one of the supported locales
        if (pathSegments.length > 0 && localesSet.has(languageValue)) {
            urlLocale = languageValue;
            pathWithoutLocale = '/' + pathSegments.slice(1).join('/'); // Remove the locale segment
            if (pathWithoutLocale === '') pathWithoutLocale = '/'; // Ensure it's '/' for root after removing locale
        } else {
            // No locale prefix in the URL. The actual pathname is the full original pathname.
            pathWithoutLocale = pathname;
        }

        const effectiveLocaleForRequest = urlLocale ?? initialChosenLocale;

        let response: NextResponse;

        if (!urlLocale) {
            const targetPath = `/${effectiveLocaleForRequest}${pathWithoutLocale}`;
            const targetUrl = new URL(`${targetPath}${search}${hash}`, request.url);
            if (initialChosenLocale === config.defaultLocale) {
                response = NextResponse.rewrite(targetUrl, { request });
            } else {

                response = NextResponse.redirect(targetUrl, request,);
            }
        } else {
            response = NextResponse.next({
                request,
            });
        }

        if (!existingLocaleCookie ||
            existingLocaleCookie !== effectiveLocaleForRequest ||
            (urlLocale && urlLocale !== initialChosenLocale)) {

            response.cookies.set(localeCookieName, urlLocale ?? effectiveLocaleForRequest, defaultCookieOption);

            if (isSEOBot !== undefined) {
                response.cookies.set(isBotCookieKey, isSEOBot.toString(), {
                    ...defaultCookieOption,
                    maxAge: 31536000, // 1 year

                });
            }
        }

        response.headers.set('Content-Language', effectiveLocaleForRequest);

        return response;
    } catch (e) {
        console.error('Middleware Error ', e);
        return NextResponse.next({
            request,
        });
    }
}
