"use client";

import LinkComponent, { type LinkProps } from 'next/link';
import {
    forwardRef,
    type ComponentProps,
    type Ref,
} from 'react';
import config from '../../config/intl_config';
import usePathname from '../hooks/use_path_name';
import changeLanguage from '../../server/functions/change_language';



type NextLinkProps = Omit<ComponentProps<'a'>, keyof LinkProps> &
    Omit<LinkProps, 'locale' | 'href' | 'prefetch' | 'onNavigate' | 'hrefLang'>;

type Props = NextLinkProps & {
    locale: string;
    onLoadingChange?: (isLoading: boolean) => void;
    onFailed?: () => void;
};

function LocaleLinkComponent(
    {
        locale,
        scroll,
        onLoadingChange,
        onFailed,
        className,
        ...rest
    }: Props,
    ref: Ref<HTMLAnchorElement>
) {
    const pathname = usePathname();

    const localePrefix = locale === config.defaultLocale ? '' : `/${locale}`;

    const href = `${localePrefix}${pathname === '/' && localePrefix ? '' : pathname}`;

    async function handleNavigate() {
        if (onLoadingChange) onLoadingChange(true);
        const state = await changeLanguage(locale);
        if (!state) {
            if (onFailed) onFailed();
        }
        if (onLoadingChange) onLoadingChange(false);
    };

    return <LinkComponent
        ref={ref}
        hrefLang={locale}
        scroll={scroll}
        className={className}
        {...rest}
        href={href}
        onNavigate={handleNavigate}
    />;
}

const LocaleLink = forwardRef(LocaleLinkComponent);

export default LocaleLink;
