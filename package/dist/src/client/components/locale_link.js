"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import LinkComponent from 'next/link';
import { forwardRef, } from 'react';
import config from '../../config/intl_config';
import usePathname from '../hooks/use_path_name';
import { loadSiteWithoutCacheCookieName, localeCookieName } from '../../config/cookie_key';
import setCookie from '../functions/set_cookie';
function LocaleLinkComponent({ locale, scroll, className, ...rest }, ref) {
    const pathname = usePathname();
    const isDefaultLocale = locale === config.defaultLocale;
    const localePrefix = isDefaultLocale ? '' : `/${locale}`;
    const href = `${localePrefix}${pathname === '/' && localePrefix ? '' : pathname}`;
    function handleNavigate() {
        setCookie({ name: localeCookieName, value: locale });
        setCookie({ name: loadSiteWithoutCacheCookieName, value: true });
    }
    ;
    return _jsx(LinkComponent, { ref: ref, hrefLang: locale, scroll: scroll, className: className, ...rest, href: href, prefetch: false, onClick: handleNavigate });
}
const LocaleLink = forwardRef(LocaleLinkComponent);
export default LocaleLink;
