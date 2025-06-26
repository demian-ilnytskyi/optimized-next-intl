import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
export declare const localeCookieName = "__user_locale_key__";
export declare const isBotCookieKey = "__is_bot_key__";
export declare const localesSet: Set<string>;
export default function intlMiddleware(request: NextRequest): Promise<NextResponse<unknown>>;
