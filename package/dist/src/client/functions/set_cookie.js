"use client";
export default function setCookie({ name, value, maxAge }) {
    try {
        let cookieString = `${name}=${value}; path=/; max-age=${maxAge ?? 31536000}; SameSite=Lax;`;
        document.cookie = cookieString;
    }
    catch (e) {
        console.log('Set cookie on client side error: ', e);
    }
}
;
