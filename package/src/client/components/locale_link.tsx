"use client";

import LinkComponent, { type LinkProps } from 'next/link';
import {
    forwardRef,
    useEffect,
    useState,
    type ComponentProps,
    type Ref,
} from 'react';
import config from '../../config/intl_config';
import usePathname from '../hooks/use_path_name';
import { localeCookieName } from '../../config/cookie_key';
import setCookie from '../functions/set_cookie';
import { useSearchParams } from 'next/navigation';

type NextLinkProps = Omit<ComponentProps<'a'>, keyof LinkProps> &
    Omit<LinkProps, 'locale' | 'href' | 'prefetch' | 'onNavigate' | 'hrefLang'>;

type Props = NextLinkProps & {
    locale: string;
};

function LocaleLinkComponent(
    {
        locale,
        scroll,
        className,
        ...rest
    }: Props,
    ref: Ref<HTMLAnchorElement>
) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [hash, setHash] = useState('');
    useEffect(() => {
        function handleHashChange() {
            setHash(window.location.hash);
        }

        // Initialize current hash
        handleHashChange();

        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

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

const LocaleLink = forwardRef(LocaleLinkComponent);

export default LocaleLink;
