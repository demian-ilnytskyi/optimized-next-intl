"use client";
export default function setCookie({ name, value, maxAge }) {
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge ?? 31536000};` +
        ` SameSite=Lax HttpOnly; ${process.env.NODE_ENV === 'production' ? "+ 'Secure;" : ''}`;
}
;
