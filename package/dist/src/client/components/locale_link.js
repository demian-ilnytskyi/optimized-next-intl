"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import LinkComponent from 'next/link';
import { forwardRef, } from 'react';
import config from '../../config/intl_config';
import usePathname from '../hooks/use_path_name';
import changeLanguage from '../../server/functions/change_language';
function LocaleLinkComponent({ locale, scroll, onLoadingChange, onFailed, className, ...rest }, ref) {
    const pathname = usePathname();
    const localePrefix = locale === config.defaultLocale ? '' : `/${locale}`;
    const href = `${localePrefix}${pathname === '/' && localePrefix ? '' : pathname}`;
    async function handleNavigate() {
        if (onLoadingChange)
            onLoadingChange(true);
        const state = await changeLanguage(locale);
        if (!state) {
            if (onFailed)
                onFailed();
        }
        if (onLoadingChange)
            onLoadingChange(false);
    }
    ;
    return _jsx(LinkComponent, { ref: ref, hrefLang: locale, scroll: scroll, className: className, ...rest, href: href, onNavigate: handleNavigate });
}
const LocaleLink = forwardRef(LocaleLinkComponent);
export default LocaleLink;
