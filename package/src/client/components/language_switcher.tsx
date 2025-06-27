"use client";

import LinkComponent, { type LinkProps } from 'next/link';
import {
    forwardRef,
    type ComponentProps,
    type Ref,
} from 'react';
import { useRouter } from "next/navigation";
import config from '../../config/intl_config';
import usePathname from '../hooks/usePathName';
import changeLanguage from '../../server/functions/change_language';



type NextLinkProps = Omit<ComponentProps<'a'>, keyof LinkProps> &
    Omit<LinkProps, 'locale' | 'href' | 'prefetch' | 'onClick' | 'hrefLang'>;

type Props = NextLinkProps & {
    locale: string;
    onLoadingChange?: (isLoading: boolean) => void;
    componentIsSwitcher?: boolean;
};

function LanguageSwitcherComponent(
    { locale,
        scroll,
        onLoadingChange,
        componentIsSwitcher,
        ...rest
    }: Props,
    ref: Ref<HTMLAnchorElement>
) {
    const router = useRouter();
    const pathname = usePathname();

    function getPath(locale: string): string {
        const localePrefix = locale === config.defaultLocale ? '' : `/${locale}`;

        const href = `${localePrefix}${pathname}`;

        return href;
    }

    async function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
        if (onLoadingChange) onLoadingChange(true);
        event.preventDefault();
        const nextLocale = await changeLanguage(locale, componentIsSwitcher);
        router.push(getPath(nextLocale), { scroll: scroll });
        if (onLoadingChange) onLoadingChange(false);
    };

    return <LinkComponent
        ref={ref}
        hrefLang={locale}
        scroll={scroll}
        {...rest}
        href={getPath(locale)}
        onClick={(e) => handleClick(e)}
    />;
}

const LanguageSwitcher = forwardRef(LanguageSwitcherComponent);

export default LanguageSwitcher;
