"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import LinkComponent from 'next/link';
import { forwardRef, } from 'react';
import { useRouter } from "next/navigation";
import config from '../../config/intl_config';
import usePathname from '../hooks/usePathName';
import changeLanguage from '../../server/functions/change_language';
function LanguageSwitcherComponent({ locale, scroll, onLoadingChange, componentIsSwitcher, ...rest }, ref) {
    const router = useRouter();
    const pathname = usePathname();
    function getPath(locale) {
        const localePrefix = locale === config.defaultLocale ? '' : `/${locale}`;
        const href = `${localePrefix}${pathname}`;
        return href;
    }
    async function handleClick(event) {
        if (onLoadingChange)
            onLoadingChange(true);
        event.preventDefault();
        const nextLocale = await changeLanguage(locale, componentIsSwitcher);
        router.push(getPath(nextLocale), { scroll: scroll });
        if (onLoadingChange)
            onLoadingChange(false);
    }
    ;
    return _jsx(LinkComponent, { ref: ref, hrefLang: locale, scroll: scroll, ...rest, href: getPath(locale), onClick: (e) => handleClick(e) });
}
const LanguageSwitcher = forwardRef(LanguageSwitcherComponent);
export default LanguageSwitcher;
