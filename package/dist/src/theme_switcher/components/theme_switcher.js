import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Moon, Sun } from "./icons";
import ThemeSwticherButton from "./theme_switcher_button";
export default function ThemeSwticher(params) {
    return _jsxs(ThemeSwticherButton, { ...params, children: [_jsx(Sun, { className: "transition-transform duration-500 ease-in-out" +
                    " rotate-0 scale-100 opacity-100 cursor-pointer" + // Default (light mode) state
                    " dark:rotate-90 dark:scale-0 dark:opacity-0" + // Dark mode state
                    " dark:w-0 dark:h-0 h-max w-max" }), _jsx(Moon, { className: "transition-transform duration-500 ease-in-out" +
                    " -rotate-90 scale-0 opacity-0 cursor-pointer" + // Default (light mode) state
                    " dark:rotate-0 dark:scale-100 dark:opacity-100" + // Dark mode state
                    " w-0 h-0 dark:h-max dark:w-max" })] });
}
