"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "./icons";
import { isDarkCookieKey } from "../../config/cookie_key";
import setCookie from "../../client/functions/set_cookie";


export default function ThemeSwticher({ isDark, className, lightLabelText, darkLabelText }: {
    className?: string;
    isDark?: boolean;
    lightLabelText: string;
    darkLabelText: string;
}): Component {
    const [isDarkMode, setDarkMode] = useState(isDark ?? false);

    useEffect(() => {
        if (isDark === undefined) {
            setDarkMode(document.documentElement.classList.contains('dark'));
        }
    }, [isDark]);

    function changeTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        document.documentElement.classList.toggle('dark', !isDark);
        setDarkMode(!isDark);
        setCookie({ name: isDarkCookieKey, value: !isDark })
    }

    return <button
        onClick={changeTheme}
        aria-label={isDarkMode ? lightLabelText : darkLabelText}
        className={
            "relative flex items-center justify-center" + // Base flex container for centering content
            " p-2.5 aspect-square h-11.5 rounded-full cursor-pointer overflow-hidden" + // Hide overflow for potential animations, pointer cursor
            " transition-colors duration-300 ease-in-out" + // Smooth transition for background color
            " outline-none ring-2 ring-offset-2 ring-opacity-75" + // Focus ring for accessibility
            " bg-gradient-to-br from-blue-300 to-blue-500 text-yellow-500 shadow-lg shadow-blue-500/50 ring-green-500" + // Light mode default
            " dark:from-gray-700 dark:to-gray-900 dark:text-yellow-300 dark:shadow-gray-900/50 dark:ring-yellow-500 " + // Dark mode styles
            className // Custom classes passed via props
        }>
        <Sun
            className={
                "transition-transform duration-500 ease-in-out" +
                " rotate-0 scale-100 opacity-100 cursor-pointer" + // Default (light mode) state
                " dark:rotate-90 dark:scale-0 dark:opacity-0" + // Dark mode state
                " dark:w-0 dark:h-0 h-max w-max"
            }
        />
        {/* Moon Icon for Dark Mode */}
        <Moon
            className={
                "transition-transform duration-500 ease-in-out" +
                " -rotate-90 scale-0 opacity-0 cursor-pointer" + // Default (light mode) state
                " dark:rotate-0 dark:scale-100 dark:opacity-100" + // Dark mode state
                " w-0 h-0 dark:h-max dark:w-max"
            }
        />
    </button>;
}