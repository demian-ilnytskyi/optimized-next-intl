'use client';

import { isDarkCookieKey } from "optimized-next-intl";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import getCookie from "../functions/get_cookie";

export default function HelperScriptClient(): null {
    const pathname = usePathname();

    useEffect(() => {
        const isDark = getCookie(isDarkCookieKey);
        if (!isDark) {
            const isDarkBool = isDark === 'true';
            // This check is efficient as it only touches the DOM when a change is needed.
            if (document.documentElement.classList.contains('dark') !== isDarkBool) {
                document.documentElement.classList.toggle('dark', isDarkBool);
            }
        }
    }, [pathname]);

    return null;
}