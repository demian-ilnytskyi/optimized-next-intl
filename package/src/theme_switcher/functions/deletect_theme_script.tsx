import { isDarkCookieKey } from "../../config/cookie_key";

export default function DeletectThemeScript({ isDark }: { isDark: boolean | null }): Component | null {
    if (isDark !== undefined) {
        return null;
    } else {
        return <script
            id="detect-theme-script"
            dangerouslySetInnerHTML={{
                __html: `
      (function() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', prefersDark);
        document.cookie = '${isDarkCookieKey}=' +
                            prefersDark +
                            '; path=/; max-age=31536000; SameSite=Lax;'
                            ${process.env.NODE_ENV === 'production' ? ' + "Secure;"' : ''}
                            ;
      })();
    `,
            }}
        />;
    }
}