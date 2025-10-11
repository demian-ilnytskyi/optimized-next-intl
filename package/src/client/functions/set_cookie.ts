"use client";

export default function setCookie({ name, value, maxAge }: { name: string, value: unknown, maxAge?: number }): void {
    try {
        const cookieString = `${name}=${value}; path=/; max-age=${maxAge ?? 31536000}; SameSite=Lax;`;

        document.cookie = cookieString;
    } catch (e) {
        console.error('Set cookie on client side error: ', e);
    }
};
