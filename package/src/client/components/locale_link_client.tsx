"use client";

import LinkComponent from 'next/link';
import {
    forwardRef,
    useEffect,
    useState,
    type Ref,
} from 'react';
import config from '../../config/intl_config';
import usePathname from '../hooks/use_path_name';
import { localeCookieName } from '../../config/cookie_key';
import setCookie from '../functions/set_cookie';
import { useSearchParams } from 'next/navigation';
import type { LocaleLinkProps } from './locale_link';


function ClientLocaleLinkComponent(
    {
        locale,
        scroll,
        className,
        ...rest
    }: LocaleLinkProps,
    ref: Ref<HTMLAnchorElement>
) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [hash, setHash] = useState('');
    useEffect(() => {
        setHash(window.location.hash);
    }, [pathname, searchParams]);

    const isDefaultLocale = locale === config.defaultLocale;
    const localePrefix = isDefaultLocale ? '' : `/${locale}`;
    const search = searchParams.toString();

    // Fix for the root path to avoid a trailing slash like `/fr/`
    const newPathname = pathname === '/' && (localePrefix) ? '' : pathname;

    const href = `${localePrefix}${newPathname}${search ? `?${search}` : ''}${hash}`;

    function handleNavigate() {
        setCookie({ name: localeCookieName, value: locale });
    };

    return <LinkComponent
        ref={ref}
        hrefLang={locale}
        scroll={scroll}
        className={className}
        {...rest}
        href={href}
        prefetch={false}
        onClick={handleNavigate}
    />;
}

const LocaleLinkClient = forwardRef(ClientLocaleLinkComponent);

export default LocaleLinkClient;
