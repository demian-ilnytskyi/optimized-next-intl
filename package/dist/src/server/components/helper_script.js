import { jsx as _jsx } from "react/jsx-runtime";
import { isDarkCookieKey, localeCookieName } from "../../config/cookie_key";
import config from "../../config/intl_config";
export default function HelperScript() {
    if (process.env.NODE_ENV === "development")
        return null;
    return _jsx("script", { id: "app-state-checker", dangerouslySetInnerHTML: {
            __html: `
      (function() {
        try {
            /**
             * Efficiently retrieves a cookie value by its name.
             * @param {string} name - The name of the cookie to retrieve.
             * @returns {string|null} - The decoded cookie value or null if not found.
             */
            const getCookie = (name) => {
                // Use a regex to find the cookie directly, avoiding splits and loops.
                // The non-capturing group (?:^|; ) matches the start of the string or a '; '
                // to ensure we're not matching a substring of another cookie's name.
                const match = document.cookie.match(new RegExp(\`(?:^|; )\${name}=([^;]*)\`));
                return match ? decodeURIComponent(match[1]) : null;
            };
            
            function syncTheme(){
                const isDarkValue = getCookie('${isDarkCookieKey}');

                // 2. Handle Dark Mode.
                // This block is self-contained and only runs if the cookie exists.
                if (isDarkValue) {
                    const isDarkBool = isDarkValue === 'true';
                    const classList=document.documentElement.classList;
                    // This check is efficient as it only touches the DOM when a change is needed.
                    if (classList.contains('dark') !== isDarkBool) {
                        classList.toggle('dark', isDarkBool);
                    }
                }
            }

            syncTheme();

            // 1. Get cookie values directly and efficiently.
            const locale = getCookie('${localeCookieName}');

            // 3. Handle Locale Redirect.
            // The logic is clearer: redirect only if a non-default locale is set
            // and the URL isn't already localized.
            const { pathname } = window.location;
            if (locale && locale !== '${config.defaultLocale}' && !pathname.startsWith(\`/\${locale}\`)) {
                const newPath = \`/\${locale}\${pathname === '/' ? '' : pathname}\`;
                // Redirecting will stop further script execution on this page.
                window.location.href = newPath;
            }
            
            // Sync Theme when url change

            const pushState = history.pushState;
            const replaceState = history.replaceState;

            function triggerUrlChange() {
            window.dispatchEvent(new Event('urlchange'));
            }

            history.pushState = function (...args) {
            pushState.apply(history, args);
            triggerUrlChange();
            };
            history.replaceState = function (...args) {
            replaceState.apply(history, args);
            triggerUrlChange();
            };

            window.addEventListener('popstate', triggerUrlChange);

            // Re-sync theme when URL changes
            window.addEventListener('urlchange', syncTheme);

        } catch (e) {
            console.error('App State check Script Error:', e);
        }
      })();
    `,
        } });
}
