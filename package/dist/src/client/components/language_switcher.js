"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import LinkComponent from 'next/link';
import { forwardRef, } from 'react';
import { useRouter } from "next/navigation";
import config from '../../config/intl_config';
import usePathname from '../hooks/usePathName';
import changeLanguage from '../../server/functions/change_language';
function LanguageSwitcherComponent({ locale, scroll, ...rest }, ref) {
    const router = useRouter();
    const pathname = usePathname();
    const localePrefix = locale === config.defaultLocale ? '' : `/${locale}`;
    const href = `${localePrefix}${pathname}`;
    async function handleClick(event) {
        event.preventDefault();
        await changeLanguage(locale);
        router.push(href, { scroll: scroll });
    }
    ;
    return _jsx(LinkComponent, { ref: ref, hrefLang: locale, scroll: scroll, ...rest, href: href, onClick: (e) => handleClick(e) });
}
const LanguageSwitcher = forwardRef(LanguageSwitcherComponent);
export default LanguageSwitcher;
