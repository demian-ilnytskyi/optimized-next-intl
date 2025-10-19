"use client";
export default function getCookie(name) {
    try {
        const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
        return match ? decodeURIComponent(match[1]) : null;
    }
    catch (e) {
        console.error(`Get cookie on client side error: ${e}`);
        return null;
    }
}
;
