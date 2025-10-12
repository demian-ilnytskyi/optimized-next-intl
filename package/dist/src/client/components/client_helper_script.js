'use client';
import { useEffect } from "react";
import { isDarkCookieKey } from "../../config";
import getCookie from "../functions/get_cookie";
export default function ClientHelperScript() {
    useEffect(() => {
        const isDark = getCookie(isDarkCookieKey);
        const classList = document.documentElement.classList;
        const isDarkBool = isDark === 'true';
        if (classList.contains('dark') !== isDarkBool) {
            classList.toggle('dark', isDarkBool);
        }
    }, []);
    return null;
}
