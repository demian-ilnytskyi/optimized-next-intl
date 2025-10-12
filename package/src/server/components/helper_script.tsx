import { isDarkCookieKey, localeCookieName } from "../../config/cookie_key";
import config from "../../config/intl_config";

export default function HelperScript({ isDark }: { isDark: boolean | null }): Component | null {
    if (process.env.NODE_ENV === "development") return null;
    return <script
        id="intl-app-state-checker"
        dangerouslySetInnerHTML={{
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

            function setTheme(isDark){
                const classList=document.documentElement.classList;
                // This check is efficient as it only touches the DOM when a change is needed.
                if (classList.contains('dark') !== isDark) {
                    classList.toggle('dark', isDark);
                }
            }
            
            function syncTheme(){
                const isDark = getCookie('${isDarkCookieKey}');

                setTheme(isDark === 'true')
            }

            if(${isDark === null}){
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                setTheme(prefersDark);
                document.cookie = '${isDarkCookieKey}=' +
                                    prefersDark +
                                    '; path=/; max-age=31536000; SameSite=Lax;'
                                    ${process.env.NODE_ENV !== 'production' ? '+ " Secure;"' : ''};
            }else{
                syncTheme();
            }

            // 1. Get cookie values directly and efficiently.
            const locale = getCookie('${localeCookieName}');

            // 3. Handle Locale Redirect.
            // The logic is clearer: redirect only if a non-default locale is set
            // and the URL isn't already localized.
            const { pathname, search, hash } = window.location;
            if (locale && locale !== '${config.defaultLocale}' && !pathname.startsWith(\`/\${locale}\`)) {
                const newPath = \`/\${locale}\${pathname === '/' ? '' : pathname}\${search}\${hash}\`;
                // Redirecting will stop further script execution on this page.
                window.location.href = newPath;
            } else{
                // 3. Set up listeners for client-side navigation (only if not redirecting).
                
                // Store original history methods.
                const pushState = history.pushState;
                const replaceState = history.replaceState;

                // IMPROVEMENT: Simplified URL change handling by calling syncTheme directly.
                history.pushState = function (...args) {
                    pushState.apply(history, args);
                    syncTheme(); // Re-sync theme after navigation.
                };
                history.replaceState = function (...args) {
                    replaceState.apply(history, args);
                    syncTheme(); // Re-sync theme after state replacement.
                };

                // Listen for browser back/forward buttons.
                window.addEventListener('popstate', syncTheme);
            }

        } catch (e) {
            console.error('App State check Script Error:', e);
        }
      })();
    `,
        }}
    />;
}