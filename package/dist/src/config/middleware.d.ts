import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
export declare const localesSet: Set<string>;
export default function intlMiddleware(request: NextRequest): Promise<NextResponse<unknown>>;
