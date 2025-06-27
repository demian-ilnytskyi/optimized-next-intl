"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { Moon, Sun } from "./icons";
import { isDarkCookieKey } from "../../config/cookie_key";
export default function ThemeSwticher({ isDark, className, lightLabelText, darkLabelText }) {
    const [isDarkMode, setDarkMode] = useState(isDark ?? false);
    useEffect(() => {
        if (isDark === undefined) {
            setDarkMode(document.documentElement.classList.contains('dark'));
        }
    }, [isDark]);
    function changeTheme() {
        const htmlElement = document.documentElement;
        if (isDarkMode) {
            htmlElement.classList.remove('dark');
        }
        else {
            htmlElement.classList.add('dark');
        }
        setDarkMode(!isDarkMode);
        document.cookie = `${isDarkCookieKey}=${!isDarkMode}; path=/; max-age=31536000;` +
            ` SameSite=Lax HttpOnly; ${process.env.NODE_ENV === 'production' ? "+ 'Secure;" : ''}`;
    }
    return _jsxs("button", { onClick: changeTheme, "aria-label": isDarkMode ? lightLabelText : darkLabelText, className: cn("relative flex items-center justify-center", // Base flex container for centering content
        "p-2.5 rounded-full cursor-pointer overflow-hidden", // Hide overflow for potential animations, pointer cursor
        "transition-colors duration-300 ease-in-out", // Smooth transition for background color
        "outline-none ring-2 ring-offset-2 ring-opacity-75", // Focus ring for accessibility
        "bg-gradient-to-br from-blue-300 to-blue-500 text-yellow-500 shadow-lg shadow-blue-500/50 ring-green-500", // Light mode default
        "dark:from-gray-700 dark:to-gray-900 dark:text-yellow-300 dark:shadow-gray-900/50 dark:ring-yellow-500", // Dark mode styles
        className), children: [_jsx(Sun, { className: cn("transition-transform duration-500 ease-in-out", "rotate-0 scale-100 opacity-100 cursor-pointer", // Default (light mode) state
                "dark:rotate-90 dark:scale-0 dark:opacity-0", // Dark mode state
                "dark:w-0 dark:h-0 h-max w-max") }), _jsx(Moon, { className: cn("transition-transform duration-500 ease-in-out", "-rotate-90 scale-0 opacity-0 cursor-pointer", // Default (light mode) state
                "dark:rotate-0 dark:scale-100 dark:opacity-100", // Dark mode state
                "w-0 h-0 dark:h-max dark:w-max") })] });
}
