"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import LinkComponent from 'next/link';
import { forwardRef, useState, } from 'react';
import { useRouter } from "next/navigation";
import config from '../../config/intl_config';
import usePathname from '../hooks/usePathName';
import changeLanguage from '../../server/functions/change_language';
function LocaleLinkComponent({ locale, scroll, onLoadingChange, onFailed, className, ...rest }, ref) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const localePrefix = locale === config.defaultLocale ? '' : `/${locale}`;
    const href = `${localePrefix}${pathname === '/' && localePrefix ? '' : pathname}`;
    async function handleClick(event) {
        event.preventDefault();
        if (!isLoading) {
            setIsLoading(true);
            if (onLoadingChange)
                onLoadingChange(true);
            const state = await changeLanguage(locale);
            if (state) {
                router.push(href, { scroll: scroll });
            }
            else {
                if (onFailed)
                    onFailed();
            }
            if (onLoadingChange)
                onLoadingChange(false);
            setIsLoading(false);
        }
    }
    ;
    return _jsx(LinkComponent, { ref: ref, hrefLang: locale, scroll: scroll, className: isLoading ? 'cursor-not-allowed ' : 'cursor-pointer ' + className, ...rest, href: href, onClick: (e) => handleClick(e) });
}
const LocaleLink = forwardRef(LocaleLinkComponent);
export default LocaleLink;
