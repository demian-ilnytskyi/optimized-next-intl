"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import LinkComponent from 'next/link';
import { forwardRef, } from 'react';
import config from '../../config/intl_config';
import usePathname from '../hooks/use_path_name';
import { swiutchLocaleCookieName as switchLocaleCookieName } from '../../config/cookie_key';
import setCookie from '../functions/set_cookie';
function LocaleLinkComponent({ locale, scroll, className, ...rest }, ref) {
    const pathname = usePathname();
    const localePrefix = locale === config.defaultLocale ? '' : `/${locale}`;
    const href = `${localePrefix}${pathname === '/' && localePrefix ? '' : pathname}`;
    function handleNavigate(e) {
        e.preventDefault();
        setCookie({ name: switchLocaleCookieName, value: locale, maxAge: 15 });
        window.location.href = href;
    }
    ;
    return _jsx(LinkComponent, { ref: ref, hrefLang: locale, scroll: scroll, className: className, ...rest, href: href, onClick: handleNavigate });
}
const LocaleLink = forwardRef(LocaleLinkComponent);
export default LocaleLink;
