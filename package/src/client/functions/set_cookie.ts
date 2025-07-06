"use client";

export default function setCookie({ name, value, maxAge }: { name: string, value: unknown, maxAge?: number }) {
    try {
        let cookieString = `${name}=${value}; path=/; max-age=${maxAge ?? 31536000}; SameSite=Lax;`;

        if (process.env.NODE_ENV === 'production') {
            cookieString += ' Secure;';
        }

        document.cookie = cookieString;
    } catch (e) {
        console.log('Set cookie on client side error: ', e);
    }
};
